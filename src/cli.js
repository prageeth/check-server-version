const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));

if (argv.help) {
    const usage = require('./cli/usage');
    usage();
}

if (argv.version) {
    const version = require('./cli/version');
    version();
}

const VersionCheckService = require('./service');

let service;
try {
    service = new VersionCheckService({
        url: argv.url,
        delay: argv.delay ? parseInt(argv.delay) : undefined,
        limit: argv.limit ? parseInt(argv.limit) : undefined,
        jsonPath: argv['json-path'],
        version: argv['target-version'],
        showLogs: argv['show-logs']
    });
} catch (error) {
    console.error(error.message);
    process.exit(1);
}

const getServerVersion = async () => {
    const success = await service.start();
    console.log('success', success);
    process.exit(success ? 0 : 401);
};

// call async method
getServerVersion();
