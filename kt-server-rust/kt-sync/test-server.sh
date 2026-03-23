#!/bin/bash

# port and db used for testing instance

# If port already set, use that, otherwise, use 5667
PORT=${PORT:-5667}

DBPATH=/tmp/kt-server-rust-sync-testing/
mkdir -p $DBPATH

# Set up an isolated KomuTracker instance
pushd ..
cargo run --bin kt-server -- --testing --port $PORT --dbpath $DBPATH/data.db --no-legacy-import --verbose
