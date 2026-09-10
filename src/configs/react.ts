import eslintReact from '@eslint-react/eslint-plugin';
import type { ESLint } from 'eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import type { Ruleset } from '../utils/types.js';
import { GLOB_JSX_ALL, GLOB_SRC, GLOB_TESTS, GLOB_TYPESCRIPT } from '../utils/globs.js';
import { escalate } from '../utils/severity.js';
import { buildConfigName } from '../utils/naming.js';

/**
 * `eslint-plugin-react-hooks` still nests its legacy presets under
 * `configs.flat`, which ESLint's own `Plugin` type does not model. Only the
 * rules and metadata matter to a flat config, so the plugin is rebuilt from
 * those rather than described as something it is not.
 */
const reactHooksPlugin: ESLint.Plugin = {
  meta: reactHooks.meta,
  rules: reactHooks.rules
};

/**
 * `eslint-plugin-react-hooks` v7 ships the compiler-powered implementations of
 * these checks, so the overlapping `@eslint-react` copies are turned off.
 */
const ESLINT_REACT_RULES_OWNED_BY_HOOKS_PLUGIN = Object.fromEntries([
  'error-boundaries',
  'exhaustive-deps',
  'globals',
  'immutability',
  'purity',
  'refs',
  'rules-of-hooks',
  'set-state-in-effect',
  'set-state-in-render',
  'static-components',
  'unsupported-syntax',
  'use-memo'
].map((rule) => [`@eslint-react/${rule}`, 'off']));

/**
 * React rules: modern component correctness, the official hook rules, and the
 * DOM/Web API leak checks.
 *
 * Compose with `base`, `browser`, and — for `.tsx` — `typescript`. Accessibility
 * rules are a separate opt-in module; see `a11y()`.
 */
export const react: Ruleset = [
  {
    name: buildConfigName('react/setup'),
    files: GLOB_SRC,
    plugins: {
      '@eslint-react': eslintReact,
      'react-hooks': reactHooksPlugin
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      'react-x': {
        importSource: 'react',
        polymorphicPropName: 'as',
        version: 'detect'
      }
    }
  },
  {
    name: buildConfigName('react/rules'),
    files: GLOB_SRC,
    rules: {
      ...escalate(eslintReact.configs['strict-type-checked'].rules),
      ...ESLINT_REACT_RULES_OWNED_BY_HOOKS_PLUGIN,
      ...escalate(reactHooks.configs['recommended-latest'].rules),

      // `exhaustive-deps` is advisory rather than always-correct; keep it loud
      // but not build-breaking so that documented escapes stay practical.
      'react-hooks/exhaustive-deps': 'warn',

      // Class components are legacy, but banning them outright breaks error
      // boundaries, which still have no hook equivalent.
      '@eslint-react/no-class-component': 'off',

      // Needs the type checker; re-enabled below for TypeScript only.
      '@eslint-react/no-unused-props': 'off'
    }
  },
  {
    name: buildConfigName('react/type-aware'),
    files: GLOB_TYPESCRIPT,
    rules: {
      '@eslint-react/no-unused-props': 'error'
    }
  },
  {
    name: buildConfigName('react/jsx'),
    files: GLOB_JSX_ALL,
    rules: {
      // A component file legitimately grows past the generic limit.
      'max-lines-per-function': ['error', { IIFEs: false, max: 200, skipBlankLines: true, skipComments: true }],

      // JSX callbacks are naturally nested one level deeper than plain code.
      'max-nested-callbacks': ['error', { max: 4 }]
    }
  },
  {
    name: buildConfigName('react/tests'),
    files: GLOB_TESTS,
    rules: {
      '@eslint-react/no-nested-component-definitions': 'off',
      'react-hooks/rules-of-hooks': 'off'
    }
  }
];

export default react;
