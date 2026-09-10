/**
 * Jest runs in ESM mode: the package is `type: module` and `src/configs/a11y.ts`
 * relies on `import.meta.url`, so the sources cannot be transpiled to CommonJS.
 */

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'node',

  // Only the suites at the root of `test/` are real tests. Everything under
  // `tests/fixtures` is deliberately broken source for the linter to chew on.
  testMatch: ['<rootDir>/test/*.test.ts'],

  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }]
  },

  // The sources import with the `.js` extension that Node requires at runtime.
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  }
};

export default config;
