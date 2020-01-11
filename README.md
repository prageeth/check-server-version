### check-server-version [![npm version](https://badge.fury.io/js/check-server-version.svg)](https://badge.fury.io/js/check-server-version)

Check a server version using an endpoint that returns JSON.

This script will ping continuously (with a delay, for a given number of times) until the version matches a given version.

## Install

```
npm install -g check-server-version
```

### Usage

```
check-server-version
    // the server url that returns json
    --url="http://myserver.com/api/version"
    // the path of the json object that shows the version
    // e.g. { data: { api: { version: "1.5.0" }}}
    --json-path="data.api.version"
    // the target expected version
    --target-version="1.5.0"
    // delay between checks in seconds [default 1 second]
    // e.g. 30 seconds
    --delay=30
    // number of times to check [default 10 times]
    --limit=5
```

```
// display current version of the 'check-server-version-plugin

check-server-version --version
```

```
// get help/usage of the plugin

check-server-version --help
```
