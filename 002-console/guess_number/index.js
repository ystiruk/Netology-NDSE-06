const readline = require('readline');

const rl = readline.createInterface(process.stdin);

rl.on('line', (input) => {
    input = +input;
    if (isNaN(input)) {
        return;
    }

    if (input > numberToGuess) {
        console.log('Меньше');
    } else if (input < numberToGuess) {
        console.log('Больше');
    } else {
        console.log(`Отгадано число ${numberToGuess}`);
        rl.close();
    }
});

const
    min = 0,
    max = 100,
    numberToGuess = getRandomInteger(min, max);

console.log(`Загадано число в диапазоне от ${min} до ${max}`);

//---

function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}