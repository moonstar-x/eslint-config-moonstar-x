import stylisticPlugin from '@stylistic/eslint-plugin';
import regexpPlugin from 'eslint-plugin-regexp';
import unicorn from 'eslint-plugin-unicorn';
import { GLOB_SRC, GLOB_TYPESCRIPT } from '../utils/globs.js';
import { buildConfigName } from '../utils/naming.js';
import type { Ruleset } from '../utils/types.js';

/**
 * Formatting and layout rules.
 *
 * Kept apart from `base` so that a project already using a dedicated formatter
 * can compose the correctness rules without fighting over whitespace. The
 * conventions here are two-space indentation, single quotes, semicolons, 1TBS
 * braces and no trailing commas.
 */
export const stylistic: Ruleset = [
  {
    name: buildConfigName('stylistic/setup'),
    files: GLOB_SRC,
    plugins: {
      '@stylistic': stylisticPlugin,
      regexp: regexpPlugin,
      unicorn
    }
  },
  {
    name: buildConfigName('stylistic/rules'),
    files: GLOB_SRC,
    rules: {
      // Indentation and line breaks.
      '@stylistic/indent': ['error', 2, {
        ArrayExpression: 1,
        CallExpression: { arguments: 1 },
        FunctionDeclaration: { body: 1, parameters: 1 },
        FunctionExpression: { body: 1, parameters: 1 },
        ImportDeclaration: 1,
        ObjectExpression: 1,
        SwitchCase: 1,
        VariableDeclarator: 1,
        flatTernaryExpressions: false,
        ignoreComments: false,
        offsetTernaryExpressions: true,
        outerIIFEBody: 1
      }],
      '@stylistic/indent-binary-ops': ['error', 2],
      '@stylistic/linebreak-style': ['error', 'unix'],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/no-multiple-empty-lines': ['error', { max: 2, maxBOF: 0, maxEOF: 1 }],
      '@stylistic/no-trailing-spaces': ['error', { ignoreComments: false, skipBlankLines: false }],
      '@stylistic/no-tabs': ['error', { allowIndentationTabs: false }],
      '@stylistic/no-mixed-spaces-and-tabs': 'error',
      '@stylistic/max-len': ['error', {
        code: 180,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
        tabWidth: 2
      }],
      '@stylistic/max-statements-per-line': ['error', { max: 1 }],

      // Quotes, semicolons and separators.
      '@stylistic/quotes': ['error', 'single', { allowTemplateLiterals: 'never', avoidEscape: true }],
      '@stylistic/quote-props': ['error', 'as-needed', { keywords: false, numbers: false, unnecessary: true }],
      '@stylistic/semi': ['error', 'always', { omitLastInOneLineBlock: false, omitLastInOneLineClassBody: false }],
      '@stylistic/semi-spacing': ['error', { after: true, before: false }],
      '@stylistic/semi-style': ['error', 'last'],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/comma-spacing': ['error', { after: true, before: false }],
      '@stylistic/comma-style': ['error', 'last'],
      '@stylistic/dot-location': ['error', 'property'],

      // Braces and blocks.
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/block-spacing': ['error', 'always'],
      '@stylistic/padded-blocks': ['error', 'never', { allowSingleLineBlocks: false }],
      '@stylistic/curly-newline': ['error', { consistent: true, multiline: true }],
      '@stylistic/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      '@stylistic/nonblock-statement-body-position': ['error', 'beside'],
      '@stylistic/switch-colon-spacing': ['error', { after: true, before: false }],
      '@stylistic/padding-line-between-statements': ['error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'any', prev: 'directive', next: 'directive' },
        { blankLine: 'always', prev: ['case', 'default'], next: '*' },
        { blankLine: 'always', prev: '*', next: ['class', 'function'] },
        { blankLine: 'always', prev: ['class', 'function'], next: '*' }
      ],

      // Spacing.
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/arrow-spacing': ['error', { after: true, before: true }],
      '@stylistic/computed-property-spacing': ['error', 'never', { enforceForClassMembers: true }],
      '@stylistic/function-call-spacing': ['error', 'never'],
      '@stylistic/generator-star-spacing': ['error', { after: true, before: false }],
      '@stylistic/key-spacing': ['error', { mode: 'strict' }],
      '@stylistic/keyword-spacing': ['error', { after: true, before: true }],
      '@stylistic/no-multi-spaces': ['error', { ignoreEOLComments: false }],
      '@stylistic/no-whitespace-before-property': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/rest-spread-spacing': ['error', 'never'],
      '@stylistic/space-before-blocks': ['error', 'always'],
      '@stylistic/space-before-function-paren': ['error', { anonymous: 'never', asyncArrow: 'always', named: 'never' }],
      '@stylistic/space-in-parens': ['error', 'never'],
      '@stylistic/space-infix-ops': ['error', { int32Hint: false }],
      '@stylistic/space-unary-ops': ['error', { nonwords: false, words: true }],
      '@stylistic/spaced-comment': ['error', 'always', {
        block: { balanced: true, exceptions: ['*', '-'], markers: ['!', '*'] },
        line: { exceptions: ['-', '='], markers: ['/', '!'] }
      }],
      '@stylistic/template-curly-spacing': ['error', 'never'],
      '@stylistic/template-tag-spacing': ['error', 'never'],
      '@stylistic/yield-star-spacing': ['error', { after: true, before: false }],

      // Wrapping and operators.
      '@stylistic/arrow-parens': ['error', 'always', { requireForBlockBody: false }],
      '@stylistic/implicit-arrow-linebreak': ['error', 'beside'],
      '@stylistic/multiline-ternary': ['error', 'always-multiline'],
      '@stylistic/new-parens': ['error', 'always'],
      '@stylistic/no-extra-parens': ['error', 'all', {
        allowParensAfterCommentPattern: '@type',
        ignoreJSX: 'all',
        nestedBinaryExpressions: false,
        nestedConditionalExpressions: false,
        returnAssign: false
      }],
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/no-floating-decimal': 'error',
      '@stylistic/no-mixed-operators': ['error', {
        allowSamePrecedence: true,
        groups: [
          ['+', '-', '*', '/', '%', '**'],
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof']
        ]
      }],
      '@stylistic/object-curly-newline': ['error', { consistent: true, multiline: true }],
      '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
      '@stylistic/one-var-declaration-per-line': ['error', 'always'],
      '@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
      '@stylistic/wrap-iife': ['error', 'outside', { functionPrototypeMethods: true }],
      '@stylistic/wrap-regex': 'off',

      // Literal formatting handled by `unicorn` and `regexp`.
      'unicorn/empty-brace-spaces': 'error',
      'unicorn/escape-case': 'error',
      'unicorn/no-hex-escape': 'error',
      'unicorn/number-literal-case': ['error', { hexadecimalValue: 'uppercase' }],
      'unicorn/numeric-separators-style': ['error', { onlyIfContainsSeparator: false }],
      'unicorn/switch-case-braces': ['error', 'avoid'],
      'unicorn/template-indent': ['error', { indent: 2 }],
      'regexp/hexadecimal-escape': ['error', 'never'],
      'regexp/letter-case': ['error', {
        caseInsensitive: 'lowercase',
        controlEscape: 'uppercase',
        hexadecimalEscape: 'lowercase',
        unicodeEscape: 'lowercase'
      }],
      'regexp/sort-flags': 'error',
      'regexp/unicode-escape': ['error', 'unicodeCodePointEscape'],

      // Deliberately left off: these force line breaks that hurt more than they help.
      '@stylistic/array-bracket-newline': 'off',
      '@stylistic/array-element-newline': 'off',
      '@stylistic/function-call-argument-newline': 'off',
      '@stylistic/function-paren-newline': 'off',
      '@stylistic/line-comment-position': 'off',
      '@stylistic/lines-around-comment': 'off',
      '@stylistic/multiline-comment-style': 'off',
      '@stylistic/newline-per-chained-call': 'off',
      // `no-confusing-arrow` demands parentheses around an arrow body ternary
      // that `no-extra-parens` then reports as redundant. `no-extra-parens` is
      // the stricter of the two, so it wins.
      '@stylistic/no-confusing-arrow': 'off',
      'unicorn/prefer-ternary': 'off'
    }
  },
  {
    name: buildConfigName('stylistic/typescript'),
    files: GLOB_TYPESCRIPT,
    rules: {
      '@stylistic/member-delimiter-style': ['error', {
        multiline: { delimiter: 'semi', requireLast: true },
        multilineDetection: 'brackets',
        singleline: { delimiter: 'semi', requireLast: false }
      }],
      // `arrow` is left to `@stylistic/arrow-spacing`; the built-in override for
      // it is deprecated and warns on every run.
      '@stylistic/type-annotation-spacing': ['error', { after: true, before: false, overrides: { arrow: 'ignore' } }],
      '@stylistic/type-generic-spacing': 'error',
      '@stylistic/type-named-tuple-spacing': 'error',

      // Decorators and overload signatures read badly with the generic padding rule.
      '@stylistic/padding-line-between-statements': 'off'
    }
  }
];

export default stylistic;
