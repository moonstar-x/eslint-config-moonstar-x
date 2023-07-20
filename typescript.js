module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'greencoast/es6'
  ],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
};
