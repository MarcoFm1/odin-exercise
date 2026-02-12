import capitalize from './capitalize';

test('String capitalized should be: ', () => { 
    expect(capitalize("hello world")).toBe("Hello world");
 })