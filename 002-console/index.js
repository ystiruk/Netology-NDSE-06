const yargs = require('yargs/yargs');
const {
    hideBin
} = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
    .alias('y', 'year')
    .alias('m', 'month')
    .alias('d', 'day')
    .argv;

const today = new Date();

if (argv._.includes('add') || argv._.includes('sub')) {
    const result = getDateWithOffset(today, argv);
    console.log(result.toISOString());
} else {
    const result = getDateFormat(today, argv);
    console.log(result);
}



//TODO: fix case when argv.xxx value is 0
function getDateWithOffset(date, argv) {

    const sign = (argv._.includes('add')) ? 1 : -1;

    if (argv.year) {
        return new Date(date.setYear(date.getFullYear() + (argv.year * sign)));
    } else if (argv.month) {
        return new Date(date.setMonth(date.getMonth() + (argv.month * sign)));
    } else if (argv.day) {
        return new Date(date.setDay(date.getDay() + (argv.day * sign)));
    }
}

function getDateFormat(date, argv) {
    if (argv.year) {
        return date.toLocaleString('default', {
            year: 'numeric'
        });
    } else if (argv.month) {
        return date.toLocaleString('default', {
            month: 'long'
        });
    } else if (argv.day) {
        return date.getUTCDate();
    } else {
        return date.toISOString();
    }
}