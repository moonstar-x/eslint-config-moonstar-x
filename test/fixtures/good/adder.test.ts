import { add } from './arithmetic.js';

describe('add', () => {
  it('sums two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('is commutative', () => {
    expect(add(2, 3)).toBe(add(3, 2));
  });
});
