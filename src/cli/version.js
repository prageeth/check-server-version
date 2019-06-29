const version = () => {
    var pjson = require('./../../package.json');
    console.log(`${pjson.name} ${pjson.version}`);
    process.exit();
};

module.exports = version;