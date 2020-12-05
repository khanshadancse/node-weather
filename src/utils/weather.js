const request = require('postman-request');

const weather = (longWeather, latiWeather, weatherCb) => {
const url = `http://api.weatherstack.com/current?access_key=a2372bc5093a6a8a998dbc6ff07a0560&query=${longWeather,latiWeather}`;
request({url: url, json: true}, (error, response)=> {
    if(error) {
        return weatherCb('Please Check your network', undefined);
    }
    if(!response.body.current) {
        return weatherCb('Please enter valid long & lat', undefined);
    }
    weatherCb(undefined, response.body.current);
})
}

module.exports = weather;