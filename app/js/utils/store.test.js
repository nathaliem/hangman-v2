const store = require('./store');

test('returns categories', () => {
    const categories = store.getCategories();
    expect(categories.length).toBeGreaterThan(0);
});

test('returns words by category', () => {
    const words = store.getWordsByCategoryId(1);
    expect(words.length).toBeGreaterThan(0);
});