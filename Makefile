ifeq ($(shell uname -m), arm64)
	ARCH := _arm64
else
	ARCH :=
endif
OS := $(shell uname -s)

build: prebuild
	KT_APP_MODE=release TAURI_CONFIG= TAURI_CONFIG_PATH=kt-app/tauri.conf.json npm run tauri build -- --config kt-app/tauri.conf.json

dev: prebuild
	KT_APP_MODE=dev TAURI_CONFIG= TAURI_CONFIG_PATH=kt-app/tauri.dev.conf.json npm run tauri dev -- --config kt-app/tauri.dev.conf.json

%/.git:
	git submodule update --init --recursive

kt-app/icons/icon.png: kt-webui/.git
	mkdir -p kt-app/icons
	npm run tauri icon "./kt-webui/media/logo/logo.png"

kt-webui/dist: kt-webui/.git
	cd kt-webui && make build

prebuild: kt-webui/dist node_modules kt-app/icons/icon.png install-watchers modules

precommit: format check

format:
	cd kt-app && cargo fmt

check:
	cd kt-app && cargo check && cargo clippy

package:
ifeq ($(OS),Linux)
	rm -rf target/package/kt-app
	mkdir -p target/package/kt-app
	cp kt-app/target/release/bundle/deb/*.deb target/package/kt-app/kt-app$(ARCH).deb
	cp kt-app/target/release/bundle/rpm/*.rpm target/package/kt-app/kt-app$(ARCH).rpm
	cp kt-app/target/release/bundle/appimage/*.AppImage target/package/kt-app/kt-app$(ARCH).AppImage

	mkdir -p dist/kt-app
	rm -rf dist/kt-app/*
	cp target/package/kt-app/* dist/kt-app/
else
	rm -rf target/package
	mkdir -p target/package
	cp kt-app/target/release/kt-app target/package/kt-app

	mkdir -p dist
	find dist/ -maxdepth 1 -type f -delete 2>/dev/null || true
	cp target/package/* dist/
endif

node_modules: package-lock.json
	npm ci

# Watcher
venv:
	python3 -m venv venv
	./venv/bin/pip install --upgrade pip

venv/.afk-installed: venv
	cd kt-watcher-afk && ../venv/bin/pip install .
	touch venv/.afk-installed

venv/.window-installed: venv kt-watcher-window/aw_watcher_window/aw-watcher-window-macos
	cd kt-watcher-window && ../venv/bin/pip install .
	cp kt-watcher-window/aw_watcher_window/aw-watcher-window-macos venv/lib/python3.*/site-packages/aw_watcher_window/ 2>/dev/null || true
	touch venv/.window-installed

kt-watcher-window/aw_watcher_window/aw-watcher-window-macos: kt-watcher-window/aw_watcher_window/macos.swift
ifeq ($(OS),Darwin)
	swiftc kt-watcher-window/aw_watcher_window/macos.swift -o kt-watcher-window/aw_watcher_window/aw-watcher-window-macos
else
	@echo "Skipping Swift build (not on macOS)"
	@touch kt-watcher-window/aw_watcher_window/aw-watcher-window-macos
endif

install-watcher-afk: venv/.afk-installed

install-watcher-window: venv/.window-installed

install-watchers: install-watcher-afk install-watcher-window

run-watcher-afk: venv/.afk-installed
	./venv/bin/kt-watcher-afk

run-watcher-window: venv/.window-installed
	./venv/bin/kt-watcher-window

# kt-sync (Rust binary)
kt-server-rust/target/release/kt-sync:
	cd kt-server-rust/kt-sync && cargo build --release

install-sync: kt-server-rust/target/release/kt-sync
	@echo "kt-sync built successfully"

run-sync: kt-server-rust/target/release/kt-sync
	./kt-server-rust/target/release/kt-sync daemon

# Create modules directory with symlinks for app discovery

kt-server-rust/kt-sync/target/debug/kt-sync:
	cd kt-server-rust/kt-sync && cargo build

modules: venv/.afk-installed venv/.window-installed kt-server-rust/kt-sync/target/debug/kt-sync
	mkdir -p modules
	ln -sf ../venv/bin/aw-watcher-afk modules/kt-watcher-afk
	ln -sf ../venv/bin/aw-watcher-window modules/kt-watcher-window
	ln -sf kt-server-rust/kt-sync/target/debug/kt-sync modules/kt-sync

clean-watchers:
	rm -rf venv modules
	rm -f kt-watcher-window/kt_watcher_window/kt-watcher-window-macos
	cd kt-server-rust && cargo clean
