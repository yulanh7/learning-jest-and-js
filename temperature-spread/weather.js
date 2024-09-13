const fs = require('fs');

function readDataFromFile(filePath) {
  const weatherData = fs.readFileSync("heathrow-weather-data.txt", 'utf-8');

  const filteredData = weatherData.split("\n").filter(line => {
    const trimmedData = line.trim();
    return trimmedData && /^\d{4}/.test(trimmedData)
  });

  return filteredData;

}

function parseHeaderAndData(lines) {
  const headers = ['yyyy', 'mm', 'tmax', 'tmin', 'af', 'rain', 'sun'];
  const parsedData = lines.map(line => {
    const values = line.trim().split(/\s+/);
    const entry = {};
    headers.forEach((header, index) => {
      entry[header] = values[index] !== '---' ? (isNaN(values[index]) ? values[index] : parseFloat(values[index])) : null;
    })
    return entry
  });

  return parsedData
}

function findSmallestSpread(data) {
  return data.reduce((smallest, current) => {
    const currentSpread = current.tmax - current.tmin;
    const smallestSpread = smallest.tmax - smallest.tmin;
    return currentSpread < smallestSpread ? current : smallest;
  });
}

function processTemperatureData(filePath) {
  const rawData = readDataFromFile(filePath);
  const parsedData = parseHeaderAndData(rawData);
  return findSmallestSpread(parsedData)
}


module.exports = { readDataFromFile, parseHeaderAndData, findSmallestSpread, processTemperatureData }