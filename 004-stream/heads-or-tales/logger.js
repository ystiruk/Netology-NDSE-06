const path = require('path');
const fs = require('fs');
const {
    EOL
} = require('os');

function attachLogFile(logFileName, directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }

    return path.join(directory, logFileName);
}

function writeLog(file, message, debug = true) {
    if (debug) {
        console.log(message);
    }

    fs.appendFileSync(file, `${message}${EOL}`);
}


module.exports = {
    attachLogFile,
    writeLog
};