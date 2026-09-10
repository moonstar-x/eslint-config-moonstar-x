import { describe, expect, it } from '@jest/globals';
import {
  a11y,
  base,
  browser,
  ignores,
  jest,
  node,
  react,
  sorted,
  stylistic,
  stylisticJsx,
  typescript,
  typescriptSyntaxOnly
} from '../src/index.js';
import type { Ruleset } from '../src/index.js';
import { createLinter, format, lintFixture } from './helpers.js';

const JS: Ruleset = [...ignores, ...base, ...stylistic, ...sorted];
const NODE: Ruleset = [...ignores, ...base, ...node, ...stylistic, ...sorted];
const TS: Ruleset = [...ignores, ...base, ...typescript, ...stylistic, ...sorted];
const REACT: Ruleset = [...ignores, ...base, ...browser, ...typescript, ...react, ...a11y(), ...stylistic, ...stylisticJsx, ...sorted];

/**
 * `jest/no-deprecated-functions` reads the Jest version installed next to the
 * linted file, and the fixture project has no Jest of its own.
 */
const JEST: Ruleset = [...ignores, ...base, ...typescript, ...jest, {
  name: 'fixtures/jest',
  rules: { 'jest/no-deprecated-functions': 'off', 'jest/prefer-importing-jest-globals': 'off' }
}];

/** Assert on the rendered messages so a failure reads as a lint report. */
const expectClean = async (config: Ruleset, fixture: string): Promise<void> => {
  const { messages } = await lintFixture(config, fixture);

  expect(format(messages)).toBe('');
};

const expectReports = async (config: Ruleset, fixture: string, expected: string[]): Promise<void> => {
  const { ruleIds } = await lintFixture(config, fixture);

  expect(ruleIds).toEqual(expect.arrayContaining(expected));
};

describe('javascript', () => {
  it('accepts idiomatic source', async () => {
    await expectClean(JS, 'good/plain.js');
  });

  it('reports the usual suspects', async () => {
    await expectReports(JS, 'bad/violations.js', [
      '@stylistic/max-statements-per-line',
      '@stylistic/quotes',
      '@stylistic/semi',
      'eqeqeq',
      'no-var'
    ]);
  });
});

describe('node', () => {
  it('accepts idiomatic source', async () => {
    await expectClean(NODE, 'good/script.js');
  });

  it('reports legacy CommonJS and blocking calls', async () => {
    await expectReports(NODE, 'bad/script.js', [
      'n/no-path-concat',
      'n/no-sync',
      'n/prefer-node-protocol',
      'unicorn/prefer-module'
    ]);
  });
});

describe('typescript', () => {
  it('accepts idiomatic source', async () => {
    await expectClean(TS, 'good/typed.ts');
  });

  it('accepts source that satisfies every sorting rule', async () => {
    await expectClean(TS, 'good/sorting.ts');
  });

  it('reports unsound typing', async () => {
    await expectReports(TS, 'bad/violations.ts', [
      '@typescript-eslint/explicit-function-return-type',
      '@typescript-eslint/no-explicit-any',
      '@typescript-eslint/no-non-null-assertion',
      '@typescript-eslint/no-unsafe-type-assertion'
    ]);
  });

  it('reports unsound typing without a project too', async () => {
    const syntaxOnly = [...ignores, ...base, ...typescriptSyntaxOnly, ...stylistic];

    await expectReports(syntaxOnly, 'bad/violations.ts', [
      '@typescript-eslint/explicit-function-return-type',
      '@typescript-eslint/no-explicit-any',
      '@typescript-eslint/no-non-null-assertion'
    ]);
  });
});

describe('react', () => {
  it('accepts an idiomatic component', async () => {
    await expectClean(REACT, 'good/component.tsx');
  });

  it('reports missing keys and inaccessible handlers', async () => {
    await expectReports(REACT, 'bad/component.tsx', [
      '@eslint-react/no-missing-key',
      'jsx-a11y/click-events-have-key-events',
      'jsx-a11y/no-static-element-interactions'
    ]);
  });
});

describe('jest', () => {
  it('accepts an idiomatic suite', async () => {
    await expectClean(JEST, 'good/adder.test.ts');
  });

  it('reports focused tests and loose matchers', async () => {
    await expectReports(JEST, 'bad/adder.test.ts', [
      'jest/no-focused-tests',
      'jest/prefer-to-be'
    ]);
  });
});

describe('ignores', () => {
  it('skips generated output', async () => {
    const isIgnored = await createLinter(JS).isPathIgnored('dist/generated.js');

    expect(isIgnored).toBe(true);
  });

  it('does not skip source', async () => {
    const isIgnored = await createLinter(JS).isPathIgnored('good/plain.js');

    expect(isIgnored).toBe(false);
  });
});
