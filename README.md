KomuTracker
===========
[![Build](https://github.com/ncc-sg/komutracker-rust/actions/workflows/build.yml/badge.svg)](https://github.com/ncc-sg/komutracker-rust/actions/workflows/build.yml)

A cross-platform KomuTracker desktop application built with [Tauri 2.x](https://tauri.app/).

This is the modern replacement for kt-qt, providing a streamlined way to run KomuTracker on all platforms.

## Features

 - **System Tray**: Full-featured tray icon with module management
  - **Module Manager**: Automatic discovery, start/stop, and crash recovery for watchers
  - **Embedded Server**: Runs kt-server-rust as part of the main executable
  - **WebView**: Serves the kt-webui directly within the app
 - **Single Instance**: Prevents multiple instances from running
 - **Autostart**: Configurable system autostart with minimized launch option
  - **Notifications**: Native system notifications via kt-notify integration
  - **Sync Support**: Built-in kt-sync daemon support
  - **Linux Wayland**: Auto-detection and kt-awatcher support
 - **Log Rotation**: Automatic log file rotation (32MB max, 5 rotated files)
 - **TOML Configuration**: User-configurable settings for port, modules, and discovery paths

## Benefits of Tauri 2.x

 - Builds cross-platform nicely (see [their docs](https://tauri.app/start/prerequisites/))
   - Generates deb and AppImage with a simple `npx tauri build`
   - Uses Gtk on Linux, and [tao](https://github.com/tauri-apps/tao) on Windows and macOS
  - No more messy PyInstaller for the main entrypoint (kt-qt)
   - Good [docs for code-signing](https://tauri.app/distribute/) on all platforms
   - Includes an [updater](https://tauri.app/plugin/updater/) for `MSI`, `.AppImage`, `.app` bundle
 - Contains a webview with an easy interface to Rust code
  - [Tray icon support](https://tauri.app/learn/system-tray/)
  - Mobile support available for iOS and Android

## Prerequisites

 - Tauri 2.x dependencies (see [their docs](https://tauri.app/start/prerequisites/))
 - Node.js (v20.19.0 or compatible, see `.nvmrc`)
 - Rust (Edition 2021)
 - Python 3 with Poetry (for building watchers)

## Usage

Clone with submodules:

```sh
git clone --recursive https://github.com/ncc-sg/komutracker-rust.git
cd komutracker-rust
```

To run in development mode:

```sh
npm install
make dev
```

To build:

```sh
make build
```

### Available Make Commands

| Command | Description |
|---------|-------------|
| `make build` | Full production build with prebuild step |
| `make dev` | Development mode with hot reload |
| `make prebuild` | Build kt-webui, install watchers, setup modules |
| `make install-watchers` | Install both afk and window watchers |
| `make install-sync` | Build kt-sync |
| `make modules` | Create modules directory with symlinks |
| `make package` | Package built artifacts (platform-specific) |
| `make format` | Format Rust code |
| `make check` | Run cargo check and clippy |

## Project Structure

```
komutracker-rust/
├── kt-app/                  # Tauri 2.x application (Rust)
│   ├── src/
│   │   ├── main.rs          # Entry point
│   │   ├── lib.rs           # Core app logic, server, tray
│   │   ├── manager.rs       # Module process manager
│   │   ├── dirs.rs          # Platform-specific directories
│   │   └── logging.rs       # Log rotation setup
│   ├── tauri.conf.json      # Tauri configuration
│   └── capabilities/        # Tauri 2.0 security capabilities
├── kt-webui/                # Web UI (git submodule, Vue 2.7)
├── kt-server-rust/          # Server backend (git submodule)
├── kt-watcher-afk/          # AFK watcher (git submodule, Python)
├── kt-watcher-window/       # Window watcher (git submodule, Python)
├── kt-notify/               # Notification binary
├── modules/                 # Symlinks to built module executables
├── venv/                    # Python virtual environment
└── Makefile                 # Build commands
```

## Configuration

Configuration file location (TOML format):
- **Linux**: `~/.config/komutracker/kt-app/config.toml`
- **macOS**: `~/Library/Application Support/komutracker/kt-app/config.toml`
- **Windows**: `%APPDATA%\komutracker\kt-app\config.toml`

Example configuration:

```toml
port = 5600

[autostart]
enabled = true
minimized = true
modules = ["kt-watcher-afk", "kt-watcher-window"]

# Module with custom arguments
[autostart.modules.kt-sync]
args = ["daemon"]
```

## Log Files

Log files with rotation (32MB max, 5 rotated files):
- **Linux**: `~/.cache/komutracker/kt-app/log/kt-app.log`
- **macOS**: `~/Library/Logs/komutracker/kt-app/kt-app.log`
- **Windows**: `%LOCALAPPDATA%\komutracker\kt-app\log\kt-app.log`

## Submodules

| Submodule | Description |
|-----------|-------------|
| [kt-webui](https://github.com/ncc-sg/komutracker-rust/tree/main/kt-webui) | Vue 2.7 web interface |
| [kt-server-rust](https://github.com/ncc-sg/komutracker-rust/tree/main/kt-server-rust) | Rust server backend |
| [kt-watcher-window](https://github.com/ncc-sg/komutracker-rust/tree/main/kt-watcher-window) | Window activity watcher |
| [kt-watcher-afk](https://github.com/ncc-sg/komutracker-rust/tree/main/kt-watcher-afk) | AFK detection watcher |

## Supported Platforms

- macOS (x64, ARM)
- Linux (x64, ARM) - X11 and Wayland
- Windows (x64)
