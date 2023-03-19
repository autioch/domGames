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
    'id-length': ['off']
  },
  globals: {
    $: 'true'
  }
};
