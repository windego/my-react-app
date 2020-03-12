const common = require('./webpack.common');
const merge = require('webpack-merge');

module.exports = function (webpackEnv) {
  let config;
  if (webpackEnv === 'production') {
    config = require('./webpack.prod');
  } else {
    config = require('./webpack.dev');
  }
  return merge(common, config);
}
