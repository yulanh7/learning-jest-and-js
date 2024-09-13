const { processTemperatureData } = require('./weather');

const result = processTemperatureData('heathrow-weather-data.txt')

console.log(`The month with the smallest temperature spread is: Year ${result.yyyy}, Month ${result.mm}`);
