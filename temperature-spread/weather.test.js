const { readDataFromFile } = require("./weather");
const fs = require('fs');

jest.mock('fs');

test('should read data from the file', () => {
  const mockData = `
  1948   1    8.9     3.3    ---     85.0    ---
  1948   2    7.9     2.2    ---     26.0    ---`;

  fs.readFileSync.mockReturnValue(mockData);
  const weatherData = readDataFromFile('fakePath');
  expect(weatherData).toEqual([
    '1948   1    8.9     3.3    ---     85.0    ---',
    '1948   2    7.9     2.2    ---     26.0    ---'
  ])
})
