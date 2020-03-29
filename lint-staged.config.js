const baseRules = ['prettier --write'];

// eslint-disable-next-line import/no-commonjs
module.exports = {
  '*.{js,jsx,json}': baseRules,
  '*.{ts,tsx}': ['eslint --fix', ...baseRules],
  '*.css': ['stylelint --fix', ...baseRules],
  '*.scss': ['stylelint --syntax scss --fix', ...baseRules],
};
