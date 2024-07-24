module.exports = {
  extends: [
    '@moonstar-x/eslint-config/rules/node/es6'
  ],
  env: {
    node: true
  },
  rules: {
    'no-mixed-requires': 'error',
    'no-new-require': 'error',
    'no-path-concat': 'error'
  }
};
