const fs = require('fs');

function readDataFromFile(filePath) {
  const weatherData = fs.readFileSync("heathrow-weather-data.txt", 'utf-8');

  const filteredData = weatherData.split("\n").filter(line => {
    const trimmedData = line.trim();
    return trimmedData && /^\d{4}/.test(trimmedData)
  });

  return filteredData;

}

module.exports = { readDataFromFile }