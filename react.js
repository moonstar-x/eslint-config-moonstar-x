module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true
  },
  plugins: [
    'jsx-a11y',
    'react'
  ],
  extends: [
    'react-app',
    'plugin:jsx-a11y/recommended',
    'greencoast/es6'
  ],
  rules: {
    'no-console': 'off',

    'jsx-quotes': ['error', 'prefer-double'],

    'react/default-props-match-prop-types': 'error',
    'react/destructuring-assignment': 'error',
    'react/forbid-prop-types': ['error', {
      'forbid': ['any', 'array', 'object']
    }],
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/jsx-curly-newline': 'error',
    'react/jsx-curly-spacing': ['error', {'when': 'never', 'children': true}],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'react/jsx-fragments': ['error', 'element'],
    'react/jsx-handler-names': 'error',
    'react/jsx-key': 'error',
    'react/jsx-max-props-per-line': ['error', {
      'maximum': 1,
      'when': 'multiline'
    }],
    'react/jsx-no-bind': 'off',
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-pascal-case': 'error',
    'react/jsx-props-no-multi-spaces': 'error',
    'react/jsx-tag-spacing': ['error', {
      'beforeClosing': 'never'
    }],
    'react/jsx-wrap-multilines': 'error',
    'react/no-children-prop': 'error',
    'react/no-danger': 'error',
    'react/no-deprecated': 'error',
    'react/no-did-mount-set-state': 'error',
    'react/no-did-update-set-state': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-is-mounted': 'error',
    'react/no-multi-comp': 'error',
    'react/no-redundant-should-component-update': 'error',
    'react/no-this-in-sfc': 'error',
    'react/no-typos': 'error',
    'react/no-unknown-property': 'error',
    'react/no-unsafe': 'error',
    'react/no-unused-prop-types': 'error',
    'react/no-unused-state': 'error',
    'react/no-will-update-set-state': 'error',
    'react/prefer-es6-class': ['error', 'always'],
    'react/prop-types': 'error',
    'react/react-in-jsx-scope': 'error',
    'react/require-default-props': 'off',
    'react/require-render-return': 'error',
    'react/self-closing-comp': ['error', {
      'component': true,
      'html': true
    }],
    'react/sort-comp': 'warn',
    'react/state-in-constructor': 'error',
    'react/void-dom-elements-no-children': 'error',

    'react-hooks/exhaustive-deps': 'off'
  }
};
