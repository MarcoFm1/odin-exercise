import fibonacci from "./fibonacci";

test('', () => {
    expect(fibonacci(8)).toEqual([
        0, 1, 1, 2,
        3, 5, 8, 13
    ])
})