const config = require('./config.js');
const http = require('http');

const API_KEY = config.WeatherstackAPIKey;
const city = process.argv.slice(2)[0];
if (!city) {
    console.error("First argument 'city' required. ");
    process.exit(0);
}

const baseUrl = new URL('http://api.weatherstack.com/current');
baseUrl.searchParams.append('access_key', API_KEY);
baseUrl.searchParams.append('query', city);

http.get(baseUrl.href, (res) => {
        if (res.statusCode !== 200) {
            console.error(`Unexpected status: ${res.statusCode}`);
            return;
        }

        let rawData = '';
        res.setEncoding('utf8');
        res
            .on('data', (chunk) => rawData += chunk)
            .on('end', () => {
                const weatherResponse = JSON.parse(rawData);
                if (weatherResponse.error) {
                    console.error(`Error: ${weatherResponse.error.info}`);
                    return;
                }
                printWeather(weatherResponse);
            });
    })
    .on('error', (e) => {
        console.error(`Http error: ${e.message}`);
    });


function printWeather(weatherResponse) {
    console.log(weatherResponse.location.name);

    const {
        temperature,
        pressure,
        humidity
    } = weatherResponse.current;

    console.log(`Temperature: ${temperature}`);
    console.log(`Pressure: ${pressure}`);
    console.log(`Humidity: ${humidity}`);
}