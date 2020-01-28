module.exports = {
  extends: [
    'greencoast/es6'
  ],
  env: {
    node: true
  },
  rules: {
    "no-mixed-requires": "error",
    "no-new-require": "error",
    "no-path-concat": "error"
  }
};
