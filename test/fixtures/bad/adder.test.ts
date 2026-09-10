import { add } from '../good/arithmetic.js';

describe('add', () => {
  fit('sums two numbers', () => {
    expect(add(1, 2)).toEqual(3);
  });
});
