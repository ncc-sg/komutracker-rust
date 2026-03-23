#!/bin/bash
# Helper script meant to be used to test kt-sync
# Example of a single-entry for cronjobs and the like

# exit on fail
set -e

# on Linux, use `hostnamectl`, on macOS, use `hostname`
if [ -x "$(command -v hostnamectl)" ]; then
    HOSTNAME=$(hostnamectl --static)
else
    HOSTNAME=$(hostname)
fi

# TODO: Fetch in a cross-platform way (from kt-client command output?)
AWSERVERCONF=~/.config/komutracker/kt-server/kt-server.toml

# trim everything in file AWSERVERCONF before '[server-testing]' section
# grep for the kt-server port in kt-server.toml
# if config doesn't exist, assume 5600
if [ -f "$AWSERVERCONF" ]; then
    PORT=$(sed '/\[server-testing\]/,/\[.*\]/{//!d}' $AWSERVERCONF | grep -oP 'port = "\K[0-9]+')
else
    PORT=5600
fi

SYNCDIR="$HOME/KomuTrackerSync/$HOSTNAME"
AWSYNC_ARGS="--port $PORT"
AWSYNC_ARGS_ADV="--sync-dir $SYNCDIR"

# NOTE: Only sync window and AFK buckets, for now
cargo run --bin kt-sync --release -- $AWSYNC_ARGS sync-advanced $AWSYNC_ARGS_ADV --mode push --buckets kt-watcher-window_$HOSTNAME,kt-watcher-afk_$HOSTNAME
