module.exports = {
  extends: 'qb',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'class-methods-use-this': ['off'],
    'id-blacklist': ['off'],
    'line-comment-position': ['off'],
    'no-inline-comments': ['off'],
    'no-undefined': ['off'],
    'no-magic-numbers': ['off'],
    'no-console': ['off'],
    'no-plusplus': ['off'],
    'camelcase': ['off'],
    'id-length': ['off']
  }
};
