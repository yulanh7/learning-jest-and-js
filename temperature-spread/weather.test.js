const { readDataFromFile, parseHeaderAndData } = require("./weather");
const fs = require('fs');

jest.mock('fs');

test('should read data from the file', () => {
  const mockData = `
  1948   1    8.9     3.3    ---     85.0    ---
  1948   2    7.9     2.2    ---     26.0    ---`;

  fs.readFileSync.mockReturnValue(mockData);
  const weatherData = readDataFromFile('fakePath');
  const trimmedData = weatherData.map(line => line.trim());

  expect(trimmedData).toEqual([
    '1948   1    8.9     3.3    ---     85.0    ---',
    '1948   2    7.9     2.2    ---     26.0    ---'
  ])
})

test('should parse data into objects with correct headers', () => {
  const dataLines = [
    '1948   1    8.9     3.3    ---     85.0    ---',
    '1948   2    7.9     2.2    ---     26.0    ---'
  ]

  const result = parseHeaderAndData(dataLines);
  expect(result).toEqual([
    { yyyy: 1948, mm: 1, tmax: 8.9, tmin: 3.3, af: null, rain: 85.0, sun: null },
    { yyyy: 1948, mm: 2, tmax: 7.9, tmin: 2.2, af: null, rain: 26.0, sun: null }
  ])
})
