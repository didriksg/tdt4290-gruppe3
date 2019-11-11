const functions = require('./App.js')


test('Adds 2 + 2 to equal 4', () => {
    expect(functions.add(2,2)).toBe(4);
});