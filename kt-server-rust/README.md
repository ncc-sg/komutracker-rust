kt-server-rust
==============

[![Build Status](https://github.com/ncc-sg/komutracker-rust/workflows/Build/badge.svg?branch=master)](https://github.com/ncc-sg/komutracker-rust/actions?query=workflow%3ABuild+branch%3Amaster)
[![Coverage Status](https://codecov.io/gh/ncc-sg/komutracker-rust/branch/master/graph/badge.svg)](https://codecov.io/gh/ncc-sg/komutracker-rust)
[![Dependency Status](https://deps.rs/repo/github/ncc-sg/komutracker-rust/status.svg)](https://deps.rs/repo/github/ncc-sg/komutracker-rust)

A reimplementation of kt-server in Rust.

Features missing compared to the Python implementation of kt-server:

 - API explorer (Swagger/OpenAPI)

### How to compile

Build with `cargo`:

```sh
cargo build --release
```

You can also build with make, which will build the web assets as well:

```
make build
```

Your built executable will be located in `./target/release/kt-server-rust`. If you want to use it with a development version of `kt-qt` you'll want to copy this binary into your `venv`:

```shell
cp target/release/kt-server ../venv/bin/kt-server-rust
```


### How to run

If you want to quick-compile for debugging, run cargo run from the project root:

```sh
cargo run --bin kt-server
```

*NOTE:* This will start kt-server-rust in testing mode (on port 5666 instead of port 5600).

### Syncing

For details about kt-sync-rust, see the [README](./kt-sync/README.md) in its subdirectory.
