/**
 * Minimal ambient declarations so the Jest and Vitest fixtures type-check
 * without pulling either test runner into this package's dependencies.
 */

interface Matchers {
  toBe: (expected: unknown) => void;
  toEqual: (expected: unknown) => void;
}

declare function describe(name: string, body: () => void): void;
declare function expect(actual: unknown): Matchers;

interface TestFn {
  (name: string, body: () => void): void;
  only: (name: string, body: () => void) => void;
}

declare const it: TestFn;
declare function fit(name: string, body: () => void): void;
