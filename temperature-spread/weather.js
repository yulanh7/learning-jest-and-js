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



module.exports = { readDataFromFile, parseHeaderAndData }