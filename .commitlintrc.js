module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 70],
    'body-max-length': [2, 'always', 72],
    'footer-max-length': [2, 'always', 72],
  },
};
