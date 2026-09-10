import perfectionist from 'eslint-plugin-perfectionist';
import { GLOB_JSX_ALL, GLOB_SRC, GLOB_TYPESCRIPT } from '../utils/globs.js';
import { buildConfigName } from '../utils/naming.js';
import type { Ruleset } from '../utils/types.js';

const shared = {
  ignoreCase: true,
  order: 'asc',
  type: 'natural'
};

/**
 * Deterministic ordering for imports, exports, class members, object keys and
 * type constituents.
 *
 * This is the most invasive stylistic module, so it ships on its own: compose
 * it only when a project wants sorting enforced rather than merely encouraged.
 */
export const sorted: Ruleset = [
  {
    name: buildConfigName('sorted/setup'),
    files: GLOB_SRC,
    plugins: {
      perfectionist
    }
  },
  {
    name: buildConfigName('sorted/rules'),
    files: GLOB_SRC,
    rules: {
      'perfectionist/sort-array-includes': ['error', shared],
      'perfectionist/sort-exports': ['error', shared],
      'perfectionist/sort-imports': ['error', {
        ...shared,
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'side-effect',
          'style',
          'unknown'
        ],
        internalPattern: ['^~/.+', '^@/.+', '^#.+'],
        newlinesBetween: 'ignore'
      }],
      'perfectionist/sort-maps': ['error', shared],
      'perfectionist/sort-named-exports': ['error', { ...shared, groups: ['value-export', 'type-export'] }],
      'perfectionist/sort-named-imports': ['error', { ...shared, groups: ['value-import', 'type-import'] }],
      'perfectionist/sort-sets': ['error', shared],
      'perfectionist/sort-switch-case': ['error', shared],
      'perfectionist/sort-variable-declarations': ['error', shared],

      // Left off: reordering these changes evaluation order or reads worse than
      // the order the author chose.
      'perfectionist/sort-arrays': 'off',
      'perfectionist/sort-decorators': 'off',
      'perfectionist/sort-modules': 'off',
      'perfectionist/sort-objects': 'off'
    }
  },
  {
    name: buildConfigName('sorted/typescript'),
    files: GLOB_TYPESCRIPT,
    rules: {
      'perfectionist/sort-classes': ['error', {
        ...shared,
        groups: [
          'index-signature',
          ['static-property', 'static-accessor-property'],
          ['static-get-method', 'static-set-method'],
          ['protected-static-property', 'protected-static-accessor-property'],
          ['private-static-property', 'private-static-accessor-property'],
          'static-block',
          ['property', 'accessor-property'],
          ['protected-property', 'protected-accessor-property'],
          ['private-property', 'private-accessor-property'],
          'constructor',
          ['get-method', 'set-method'],
          'method',
          ['protected-get-method', 'protected-set-method'],
          'protected-method',
          ['private-get-method', 'private-set-method'],
          'private-method',
          ['static-method', 'protected-static-method', 'private-static-method'],
          'unknown'
        ]
      }],
      'perfectionist/sort-enums': ['error', { ...shared, sortByValue: 'ifNumericEnum' }],
      'perfectionist/sort-heritage-clauses': ['error', shared],
      'perfectionist/sort-interfaces': ['error', shared],
      'perfectionist/sort-intersection-types': ['error', shared],
      'perfectionist/sort-object-types': ['error', shared],
      'perfectionist/sort-union-types': ['error', shared]
    }
  },
  {
    name: buildConfigName('sorted/jsx'),
    files: GLOB_JSX_ALL,
    rules: {
      'perfectionist/sort-jsx-props': ['error', {
        ...shared,
        groups: ['shorthand-prop', 'unknown', 'callback', 'multiline-prop'],
        customGroups: [
          { groupName: 'callback', elementNamePattern: '^on[A-Z]' }
        ]
      }]
    }
  }
];

export default sorted;
