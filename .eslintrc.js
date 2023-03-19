/* eslint-env node */
module.exports = {
  'extends': ['qb'],
  env: {
    amd: true,
    node: false,
    browser: true,
    commonjs: true
  },
  rules: {
    'func-names': ['off'],
    'id-length': ['off'],
    'no-invalid-this': ['off'],
    'no-magic-numbers': ['off'],
    'no-undef': ['off'],
    'no-use-before-define': ['off']
  },
  globals: {
    $: 'true'
  }
};
