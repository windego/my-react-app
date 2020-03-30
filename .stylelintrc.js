module.exports = {
  processors: [],
  plugins: [],
  extends: ['stylelint-config-standard'], // 这是官方推荐的方式
  rules: {
    // 这里自定义规则
    // 可参考官方：https://stylelint.docschina.org/user-guide/rules/
    indentation: 2,
    //要求或禁止声明块的一个尾随分号。
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
    'declaration-colon-newline-after': null,
    'at-rule-no-unknown': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'],
      },
    ],
  },
};
