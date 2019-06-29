const usage = () => {
    var pjson = require('./../../package.json');
    console.log(`${pjson.name} [options]`);
    process.exit();
};

module.exports = usage;