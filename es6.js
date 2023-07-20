module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  env: {
    es6: true,
    jest: true
  },
  rules: {
    // Possible Errors
    'no-console': 'warn',
    'no-cond-assign': ['error', 'always'],
    'no-control-regex': 'error',
    'no-debugger': 'error',
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-empty-character-class': 'error',
    'no-empty': 'error',
    'no-ex-assign': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-semi': 'error',
    'no-extra-parens': ['error', 'all', {
      'ignoreJSX': 'all',
      'nestedBinaryExpressions': false
    }],
    'no-func-assign': 'error',
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': 'error',
    'no-obj-calls': 'error',
    'no-sparse-arrays': 'error',
    'no-unexpected-multiline': 'error',
    'no-unreachable': 'error',
    'use-isnan': 'error',

    // Best Practices
    'block-scoped-var': 'warn',
    'curly': 'error',
    'default-case': 'warn',
    'dot-location': ['error', 'property'],
    'dot-notation': 'error',
    'eqeqeq': 'error',
    'no-alert': 'error',
    'no-else-return': 'error',
    'no-empty-function': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-fallthrough': 'error',
    'no-floating-decimal': 'error',
    'no-global-assign': 'error',
    'no-implied-eval': 'error',
    'no-labels': 'error',
    'no-multi-spaces': 'error',
    'no-new': 'error',
    'no-param-reassign': 'error',
    'no-proto': 'error',
    'no-redeclare': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-unmodified-loop-condition': 'warn',
    'no-useless-concat': 'error',
    'no-useless-escape': 'error',
    'no-useless-return': 'error',
    'no-void': 'error',
    'no-warning-comments': 'off',
    'no-with': 'error',
    'radix': 'warn',
    'wrap-iife': ['error', 'outside'],

    // Strict Mode
    'strict': ['off', 'global'],

    // Variables
    'no-undef': 'error',
    'no-undefined': 'off',
    'no-unused-vars': 'error',
    'no-use-before-define': ['error', 'nofunc'],

    // ES6
    'arrow-parens': ['error', 'always'],
    'arrow-spacing': ['error', {
      'before': true,
      'after': true
    }],
    'constructor-super': 'error',
    'no-class-assign': 'error',
    'no-confusing-arrow': 'error',
    'no-const-assign': 'error',
    'no-dupe-class-members': 'error',
    'no-duplicate-imports': 'error',
    'no-new-symbol': 'error',
    'no-this-before-super': 'error',
    'no-useless-constructor': 'error',
    'no-var': 'error',
    'prefer-const': ['warn', {
      'destructuring': 'any',
      'ignoreReadBeforeAssign': true
    }],
    'prefer-destructuring': ['error', {
      'array': false,
      'object': true
    }],
    'prefer-spread': 'warn',
    'prefer-template': 'error',
    'rest-spread-spacing': ['error', 'never'],
    'template-curly-spacing': 'error',

    // Styling
    'array-bracket-spacing': ['error', 'never'],
    'block-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs'],
    'camelcase': ['error', {
      'properties': 'always'
    }],
    'comma-dangle': ['error', 'never'],
    'comma-spacing': ['error', {
      'before': false,
      'after': true
    }],
    'comma-style': ['error', 'last'],
    'eol-last': ['error', 'unix'],
    'func-call-spacing': 'error',
    'indent': ['error', 2, {
      'SwitchCase': 1
    }],
    'key-spacing': ['error', {
      'mode': 'strict'
    }],
    'keyword-spacing': ['error', {
      'before': true,
      'after': true,
      'overrides': {}
    }],
    'max-depth': ['error', {
      'max': 4
    }],
    'max-len': ['warn', {
      'code': 180,
      'tabWidth': 2,
      'ignoreUrls': true,
      'ignoreStrings': true,
      'ignoreTemplateLiterals': true,
      'ignoreRegExpLiterals': true,
      'ignoreComments': true
    }],
    'max-lines': ['warn', {
      'max': 300,
      'skipComments': true,
      'skipBlankLines': true
    }],
    'max-params': ['warn', 3],
    'max-statements-per-line': 'error',
    'max-statements': ['error', 30, {
      'ignoreTopLevelFunctions': true
    }],
    'new-cap': 'off',
    'new-parens': 'error',
    'no-array-constructor': 'error',
    'no-bitwise': 'error',
    'no-multiple-empty-lines': ['error', {
      'max': 2,
      'maxEOF': 1,
      'maxBOF': 0
    }],
    'no-new-object': 'error',
    'no-tabs': 'error',
    'no-trailing-spaces': ['error', {
      'skipBlankLines': true
    }],
    'no-underscore-dangle': ['error', {
      'allowAfterThis': true,
      'allow': ['__REDUX_DEVTOOLS_EXTENSION__']
    }],
    'object-curly-spacing': ['error', 'always'],
    'one-var': 'off',
    'operator-linebreak': ['error', 'after'],
    'padded-blocks': ['error', 'never'],
    'quote-props': ['error', 'as-needed'],
    'quotes': ['error', 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'semi-spacing': 'error',
    'semi': ['error', 'always'],
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'spaced-comment': ['error', 'always', {
      'exceptions': ['-']
    }]
  }
};
