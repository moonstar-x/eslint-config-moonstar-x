import { add } from '../good/arithmetic.js';

describe('add', () => {
  it.only('sums two numbers', () => {
    expect(add(1, 2)).toEqual(3);
  });
});
