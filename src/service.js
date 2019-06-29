const get = require('lodash.get');
const axios = require('axios');
const sleep = require('./sleep');

const DEFAULT_DELAY = 1;
const DEFAULT_LIMIT = 10;

class VersionCheckService {

    constructor({ url, delay, jsonPath, version, limit, showLogs = true }) {
        this.url = url || '';
        this.delay = delay || DEFAULT_DELAY;
        this.limit = limit || DEFAULT_LIMIT;
        this.jsonPath = jsonPath;
        this.expectedVersion = version;
        this.showLogs = showLogs;

        this.validateInput();
        this.fixInput();
    }

    validateInput() {
        if (this.url == '') {
            throw Error('url cannot be empty');
        }
    }

    fixInput() {
        if (this.delay <= DEFAULT_DELAY) {
            this.showLogs && console.log(`Delay is less than ${DEFAULT_DELAY} second(s), therefore it has been adjusted to ${DEFAULT_DELAY} second(s)`);
            this.delay = DEFAULT_DELAY;
        }
        if (this.limit <= 0) {
            this.showLogs && console.log(`Limit is less than 0, therefore it has been adjusted to ${DEFAULT_LIMIT}`);
            this.limit = DEFAULT_LIMIT;
        }
    }

    async start() {
        let count = this.limit;
        let success = false;
        while (count > 0) {
            const response = await this.checkServer(this.limit - count + 1);
            if (this.isJsonDataValid(response)) {
                success = true;
                break;
            }
            count--;
            sleep(this.delay * 1000);
        }
        return success;
    }

    async checkServer(tryCount) {
        this.showLogs && console.log(`Trying count [${tryCount}]`, this.url);
        try {
            const { data } = await axios.get(this.url);
            this.showLogs && console.log('Response data received', data);
            return data;
        } catch (error) {
            this.showLogs && console.log('Request failed:', error.message);
            return null;
        }
    }

    isJsonDataValid(data) {
        // no need to check json path?
        if (this.jsonPath === '' && data) {
            return true;
        }
        // check json data
        const jsonVersion = get(data, this.jsonPath, '') || '';
        return `${jsonVersion}` === this.expectedVersion;
    }

}

module.exports = VersionCheckService;