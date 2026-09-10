import jestPlugin from 'eslint-plugin-jest';
import { GLOB_TESTS } from '../utils/globs.js';
import { buildConfigName } from '../utils/naming.js';
import { escalate } from '../utils/severity.js';
import type { Ruleset } from '../utils/types.js';

/**
 * Jest rules, scoped to test files only.
 */
export const jest: Ruleset = [
  {
    name: buildConfigName('jest/setup'),
    files: GLOB_TESTS,
    plugins: { jest: jestPlugin },
    languageOptions: {
      globals: jestPlugin.environments.globals.globals
    }
  },
  {
    name: buildConfigName('jest/rules'),
    files: GLOB_TESTS,
    rules: {
      ...escalate(jestPlugin.configs['flat/recommended'].rules),
      ...escalate(jestPlugin.configs['flat/style'].rules),

      'jest/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
      'jest/max-nested-describe': ['error', { max: 3 }],
      'jest/no-conditional-in-test': 'error',
      'jest/no-confusing-set-timeout': 'error',
      'jest/no-duplicate-hooks': 'error',
      'jest/no-restricted-matchers': ['error', {
        resolves: 'Use `await expect(...).resolves` instead.',
        toBeFalsy: 'Assert on the exact value instead of its truthiness.',
        toBeTruthy: 'Assert on the exact value instead of its truthiness.'
      }],
      'jest/no-test-return-statement': 'error',
      'jest/no-unneeded-async-expect-function': 'error',
      'jest/prefer-comparison-matcher': 'error',
      'jest/prefer-each': 'error',
      'jest/prefer-ending-with-an-expect': 'error',
      'jest/prefer-equality-matcher': 'error',
      'jest/prefer-hooks-in-order': 'error',
      'jest/prefer-hooks-on-top': 'error',
      'jest/prefer-importing-jest-globals': 'error',
      'jest/prefer-lowercase-title': ['error', { ignore: ['describe'] }],
      'jest/prefer-mock-promise-shorthand': 'error',
      'jest/prefer-mock-return-shorthand': 'error',
      'jest/prefer-spy-on': 'error',
      'jest/prefer-strict-equal': 'error',
      'jest/prefer-to-be': 'error',
      'jest/prefer-to-contain': 'error',
      'jest/prefer-to-have-been-called': 'error',
      'jest/prefer-to-have-been-called-times': 'error',
      'jest/prefer-to-have-length': 'error',
      'jest/prefer-todo': 'error',
      'jest/require-to-throw-message': 'error',
      'jest/require-top-level-describe': ['error', { maxNumberOfTopLevelDescribes: 1 }],
      'jest/valid-expect': ['error', { alwaysAwait: true }],
      'jest/valid-mock-module-path': 'error',
      'jest/valid-title': ['error', { ignoreTypeOfDescribeName: false }],

      // Left off: legitimate patterns that these rules forbid outright.
      'jest/no-hooks': 'off',
      'jest/prefer-called-with': 'off',
      'jest/prefer-expect-assertions': 'off',
      'jest/require-hook': 'off',

      // Relaxed for test files.
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      'max-nested-callbacks': 'off',
      'max-statements': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/unbound-method': 'off'
    }
  },
  {
    // These need the type checker, so they only apply to TypeScript tests.
    name: buildConfigName('jest/type-aware'),
    files: GLOB_TESTS.map((glob) => glob.replace('[jt]s', 'ts')),
    ignores: GLOB_TESTS.map((glob) => glob.replace('[jt]s', 'js')),
    rules: {
      'jest/no-error-equal': 'error',
      'jest/no-unnecessary-assertion': 'error',
      'jest/no-untyped-mock-factory': 'error',
      'jest/prefer-jest-mocked': 'error',
      'jest/unbound-method': 'error'
    }
  }
];

export default jest;
