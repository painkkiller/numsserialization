const { serialize } = require("../index.js");

test('should serialize array to string', () => {
    expect(serialize([1,2])).toBe('1,1');
});

test('should serialize array with repeated numbers to string', () => {
  expect(serialize([1,1,1,1,2])).toBe('1:4,1');
});