module.exports = {
  types: [
    {
      value: 'feat',
      name: '✨     feat:  添加新功能',
    },
    {
      value: 'fix',
      name: '🐞      fix:  修复Bug',
    },
    {
      value: 'refactor',
      name: '🛠  refactor:  重构代码',
    },
    {
      value: 'perf',
      name: '🐎     perf:  改善性能',
    },
    {
      value: 'docs',
      name: '📚     docs:  撰写文档',
    },
    {
      value: 'test',
      name: '🏁     test:  添加测试文件',
    },
    {
      value: 'chore',
      name: '🗯     chore:  没有对src或test模块改动. 一般是更新依赖或者构建产生的改变',
    },
    {
      value: 'style',
      name: '💅    style:  代码格式修改，比如缩进、空格、缺失的结束符等',
    },
    {
      value: 'revert',
      name: '⏪   revert:  返回到某个commit',
    },
    {
      value: 'WIP',
      name: '⏳     WIP:   Work in progress',
    },
  ],
  scopes: [
    'components',
    'pages',
    'routes',
    'dependencies',
    'assets',
    'utils',
    'service',
    'layouts',
    'public',
    'static',
    'config',
    'rootPath',
  ],
  allowCustomScopes: true,
  skipQuestions: ['footer'],
};
