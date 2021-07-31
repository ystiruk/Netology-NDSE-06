const fs = require('fs');
const path = require('path');
const {EOL} = require('os');
const input = require('readline').createInterface(process.stdin);

const _logDirectory = 'log';
const _defaultLogFileName = 'head_or_tales.log';

const logFile = getOrCreateLogFile(process.argv.slice(2)[0], _defaultLogFileName, _logDirectory);

console.log("Heads or Tails game has started. To exit type 'q'.");
process.stdout.write('Heads (1) or Tales (2)? ');

input.on('line', (line) => {
    if (line === 'q') {
        console.log('Game has ended.');
        input.close();
    }

    const number = getRandomInteger(1, 3);

    line = +line;
    if (isNaN(line) || line < 1 || line > 2) {
        console.log('type 1 or 2');
    }

    if (line === number) {
        writeLog(logFile, 'yes');
    } else {
        writeLog(logFile, 'no');
    }

    process.stdout.write('Heads (1) or Tales (2)? ');
});

// ---

function writeLog(file, message, debug = true) {
    if (debug) {
        console.log(message);
    }

    fs.appendFileSync(file, `${message}${EOL}`);
}

function getOrCreateLogFile(logFileName, defaultLogFileName, directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }

    const logFile = logFileName ? logFileName : defaultLogFileName;
    return path.join(directory, logFile);
}

function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}