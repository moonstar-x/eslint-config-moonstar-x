module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    '@moonstar-x/eslint-config/rules/node/es6',
    '@moonstar-x/eslint-config/rules/typescript/common'
  ]
};
