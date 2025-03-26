const { serialize, deserialize } = require("../index.js");

test('should deserialize string to array', () => {
    let str = serialize([1,2]);
    expect(deserialize(str)).toEqual([1,2]);
});

test('should deserialize string made from array with repeated numbers to array', () => {
    let str = serialize([1,1,1,1,2]);
    expect(deserialize(str)).toEqual([1,1,1,1,2]);
});