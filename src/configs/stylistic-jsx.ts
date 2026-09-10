import stylisticPlugin from '@stylistic/eslint-plugin';
import { GLOB_JSX_ALL } from '../utils/globs.js';
import { buildConfigName } from '../utils/naming.js';
import type { Ruleset } from '../utils/types.js';

/**
 * JSX formatting rules.
 *
 * Kept separate from `stylistic` so that a non-JSX project never loads them,
 * and so that a JSX project can adopt the correctness rules from `react`
 * without also adopting a layout opinion.
 */
export const stylisticJsx: Ruleset = [
  {
    name: buildConfigName('stylistic-jsx'),
    files: GLOB_JSX_ALL,
    plugins: {
      '@stylistic': stylisticPlugin
    },
    rules: {
      '@stylistic/jsx-child-element-spacing': 'error',
      '@stylistic/jsx-closing-bracket-location': ['error', 'tag-aligned'],
      '@stylistic/jsx-closing-tag-location': ['error', 'tag-aligned'],
      '@stylistic/jsx-curly-brace-presence': ['error', { children: 'never', propElementValues: 'always', props: 'never' }],
      '@stylistic/jsx-curly-newline': ['error', { multiline: 'consistent', singleline: 'consistent' }],
      '@stylistic/jsx-curly-spacing': ['error', { attributes: { when: 'never' }, children: { when: 'never' }, spacing: { objectLiterals: 'never' } }],
      '@stylistic/jsx-equals-spacing': ['error', 'never'],
      '@stylistic/jsx-first-prop-new-line': ['error', 'multiline'],
      '@stylistic/jsx-function-call-newline': ['error', 'multiline'],
      '@stylistic/jsx-indent-props': ['error', { ignoreTernaryOperator: false, indentMode: 2 }],
      '@stylistic/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
      '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],
      '@stylistic/jsx-pascal-case': ['error', { allowAllCaps: false, allowLeadingUnderscore: false, allowNamespace: true }],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      '@stylistic/jsx-self-closing-comp': ['error', { component: true, html: true }],
      '@stylistic/jsx-tag-spacing': ['error', {
        afterOpening: 'never',
        beforeClosing: 'never',
        beforeSelfClosing: 'always',
        closingSlash: 'never'
      }],
      '@stylistic/jsx-wrap-multilines': ['error', {
        arrow: 'parens-new-line',
        assignment: 'parens-new-line',
        condition: 'parens-new-line',
        declaration: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
        propertyValue: 'parens-new-line',
        return: 'parens-new-line'
      }],

      // Deliberately left off: `jsx-newline` and `jsx-sort-props` are noisy,
      // `jsx-indent` is superseded by `@stylistic/indent`, and
      // `jsx-props-no-multi-spaces` by `@stylistic/no-multi-spaces`.
      '@stylistic/jsx-indent': 'off',
      '@stylistic/jsx-props-no-multi-spaces': 'off',
      '@stylistic/jsx-newline': 'off',
      '@stylistic/jsx-sort-props': 'off'
    }
  }
];

export default stylisticJsx;
