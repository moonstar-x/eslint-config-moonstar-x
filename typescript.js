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
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unsafe-declaration-merging': 'off',

    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', {
      'functions': true,
      'classes': false,
      'variables': true,
      'allowNamedExports': false,
      'enums': true,
      'typedefs': true,
      'ignoreTypeReferences': true
    }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error'
  }
};
