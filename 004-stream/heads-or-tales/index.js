const logger = require('./logger');
const input = require('readline').createInterface(process.stdin);

const _defaultLogDirectory = 'log';
const _defaultLogFileName = 'head_or_tales.log';

const logFileArg = process.argv.slice(2)[0];
const logFileName = logFileArg ? logFileArg : _defaultLogFileName;
const logFile = logger.attachLogFile(logFileName, _defaultLogDirectory);

console.log("Heads or Tails game has started. To exit type 'q'.");
process.stdout.write('Heads (1) or Tales (2)? ');

input.on('line', (line) => {
    if (line === 'q') {
        console.log('Game has ended.');
        input.close();
        return;
    }

    line = +line;
    if (isNaN(line) || line < 1 || line > 2) {
        console.log('type 1 or 2');
        return;
    }
    
    const number = getRandomInteger(1, 3);

    if (line === number) {
        logger.writeLog(logFile, 'yes');
    } else {
        logger.writeLog(logFile, 'no');
    }

    process.stdout.write('Heads (1) or Tales (2)? ');
});

function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}