const readline = require('readline');
const path = require('path');
const fs = require('fs');

const logFileArg = process.argv.slice(2)[0];

//TODO: check if logFileArg is not a directory
if (!logFileArg || !fs.existsSync(logFileArg)) {
    throw new Error("First argument must be a path to existing log file");
}

const logFile = path.join(__dirname, logFileArg);

console.log(`Heads or Tails game log analyzer. Log file: '${logFile}'`);

const file = readline.createInterface({
    input: fs.createReadStream(logFile),
    output: process.stdout,
    terminal: false //suppress console output
});

let gameCount = 0;
let winCount = 0;

file.on('line', (line) => {
    if (line) {
        gameCount += 1;
        winCount += (line === 'yes') ? 1 : 0;
    }
}).on('close', () => {
    printStatistics(gameCount, winCount);
});

//---

function printStatistics(totalCount, winCount) {
    if (totalCount === 0) {
        console.log('There is no game history found in log file.');
        return;
    }

    console.log(`Games: ${totalCount}`);
    console.log(`Wins/fails: ${winCount}/${totalCount - winCount}`);

    const winRate = Math.floor((winCount / (totalCount) * 100));
    console.log(`Win rate: ${winRate}%`);
}