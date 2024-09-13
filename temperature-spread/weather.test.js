const { readDataFromFile } = require("./weather");

test('should read data from the file', () => {
  const data = readDataFromFile("heathrow-weather-data.txt");
  expect(data).toBeTruthy();
  expect(data.length).toBeGreaterThan(0);
  data.forEach(element => {
    expect(/^\d{4}/.test(element.trim())).toBe(true);
  });
})
