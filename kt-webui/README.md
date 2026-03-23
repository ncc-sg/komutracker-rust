# kt-webui

A web-based UI for KomuTracker, built with Vue.js

[![Build Status](https://github.com/ncc-sg/komutracker-rust/workflows/Build/badge.svg)](https://github.com/ncc-sg/komutracker-rust/actions)
[![Coverage Status](https://codecov.io/gh/ncc-sg/komutracker-rust/branch/master/graph/badge.svg)](https://codecov.io/gh/ncc-sg/komutracker-rust)
[![Known Vulnerabilities](https://snyk.io/test/github/ncc-sg/komutracker-rust/badge.svg)](https://snyk.io/test/github/ncc-sg/komutracker-rust)

## Getting started

Getting started with setting up the development environment is pretty straightforward:

```bash
# Start an instance of kt-server running in testing mode (on port 5666, with a separate database),
# This is what the web UI will connect to by default when run in development mode.
kt-qt --testing
# or, to run without watchers:
kt-server --testing

# Install dependencies
npm install
# or, to get exact versions of dependencies:
npm ci

# start kt-webui in dev mode
npm run serve
```

Alternatively, you can run `make dev` to install dependencies and serve the application locally.

You might have to configure CORS for it to work, see the CORS section below.

You may also want to generate fake data so you have something to test with, see: https://github.com/ncc-sg/kt-fakedata/

## Building

To build the production bundle, simply run the following:

```bash
# Install dependencies
npm ci

# Build for production
npm run build
```

## Using a pre-release with your main install

**Note:** Running a development version of kt-webui with an old kt-server can lead to issues due to version incompatibilities.

### By copying the web-assets to your main install

You can run a development version of kt-webui with your main version of KomuTracker by building it (or fetching the latest build from CI) and replacing placing the contents of the `static` directory of your kt-server (or kt-server-rust) installation. For simplicity, back up the original directory for easier switching back.

The assets are stored in the following directories (relative to your installation directory), depending on if you use kt-server-python (default) or kt-server-rust:

 - kt-server-python: `komutracker/kt-server/kt_server/static/`
 - kt-server-rust: `komutracker/kt-server-rust/static/`

You can copy the assets manually from your `make build` or `npm run build` output to the above locations.

Once you've put the files in the directories, you may have to do a hard refresh in your browser to invalidate any stale caches.

### Using your main install's data

If you want to actively iterate on `kt-webui` with your local production data (with your production server running), you'll want to use a development build, automatically update it, and connect to your production data. To do this, in `kt-webui` source directory, in one terminal window run:

```bash
KT_SERVER_URL="'http://localhost:5600'" npx vue-cli-service build --watch --dest=../kt-server/static
```

If you want to add `debugger` statements in your code and otherwise break linting rules, you'll need to add a `--skip-plugins=no-debugger` to that command. 
Then, in another terminal (with your venv activated) run:

```shell
python3 -m http.server --bind 127.0.0.1 27180 --directory ../kt-server/static
```

## Tests

Tests can be run with:

```bash
npm test
```

There are also E2E tests. You need to have an kt-server and the web UI running in development mode (with `npm run serve`, as instructed above). After you have that setup, you can run the tests with:

```bash
make test-e2e
```

## Development

### CORS

For development, you'll also have to add/change CORS configuration in the `kt-server` configs by adding `cors_origins = http://localhost:27180` to your
configuration file `/komutracker/kt-server/kt-server.toml` under respective sections (`server-testing` section when running server in testing mode).

### Code structure

One of the first things that happen in the application is the execution of `src/main.js`. This loads things such as bootstrap-vue and a bunch of other stuff that's globally used (filters, resources).

The main.js file then loads the `src/App.vue` file, which is the root component of the application.
