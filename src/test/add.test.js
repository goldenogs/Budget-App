const generateGreeting = (name) => `Hello ${name}`;

test('Check greeting', () => {
    const result = generateGreeting('Mike');
    expect(result).toBe("Hello Mike");
});