/* eslint-env node */
module.exports = {
  'extends': ['qb'],
  env: {
    amd: true,
    node: false,
    browser: true,
    commonjs: true
  },
  globals: {
    $: true,
    qbLibrary: true,
    qbLib: true
  },
  rules: {
    'array-callback-return': ['off'],
    'consistent-return': ['off'],
    'consistent-this': ['off'],
    'default-case': ['off'],
    eqeqeq: ['off'],
    'func-names': ['off'],
    'guard-for-in': ['off'],
    'id-denylist': ['off'],
    'id-length': ['off'],
    'max-depth': ['off'],
    'max-len': ['off'],
    'max-lines-per-function': ['off'],
    'max-lines': ['off'],
    'max-params': ['off'],
    'max-statements': ['off'],
    'multiline-comment-style': ['off'],
    'new-cap': ['off'],
    'newline-per-chained-call': ['off'],
    'no-alert': ['off'],
    'no-empty-function': ['off'],
    'no-inner-declarations': ['off'],
    'no-invalid-this': ['off'],
    'no-magic-numbers': ['off'],
    'no-mixed-operators': ['off'],
    'no-plusplus': ['off'],
    'no-shadow': ['off'], // ['error', { allow: ['require', 'exports', 'module'] }], // eslint-disable-line
    'no-undefined': ['off'],
    'no-underscore-dangle': ['off'],
    'no-unused-expressions': ['off'],
    'no-use-before-define': ['off'],
    'no-useless-escape': ['off'],
    'no-var': ['off'],
    'object-shorthand': ['off'],
    'padding-line-between-statements': ['off'],
    'prefer-arrow-callback': ['off'],
    'require-unicode-regexp': ['off'],
    complexity: ['off']
  }
};
