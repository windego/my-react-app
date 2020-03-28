module.exports = {
  types: [
    {
      value: 'feat',
      name: '添加新功能',
    },
    {
      value: 'fix',
      name: '修复Bug',
    },
    {
      value: 'refactor',
      name: '重构代码',
    },
    {
      value: 'style',
      name: '代码格式修改，比如缩进、空格、缺失的结束符等',
    },
    {
      value: 'chore',
      name: '没有对src或test模块改动. 一般是更新依赖或者构建产生的改变',
    },
    {
      value: 'revert',
      name: '返回到某个commit',
    },
    {
      value: 'pref',
      name: '性能优化',
    },
  ],
  scopes: ['pages', 'components', 'sub_package', 'wxs', 'store', 'config'],
  messages: {
    type: '选择要提交的更改类型:',
    scope: '选择更改影响的范围:',
    customScope: '选择更改影响的范围:',
    subject: '写一个简短、命令时态的语句来描述更改:\n',
    body: '详细描述更改原因 (可选，按回车跳过). 使用 "|" 来换行:\n',
    breaking: '列出 BREAKING CHANGES (可选，按回车跳过):\n',
    footer: '列出这次更改关闭的 ISSUES (可选，按回车跳过). 如: #31, #34:\n',
    confirmCommit: '确定提交上面的更改?',
  },
  footerPrefix: 'close',
};
