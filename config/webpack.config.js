const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = webpackEnv => {
  let config;
  if (webpackEnv === 'production') {
    config = require('./webpack.prod');
  } else {
    config = require('./webpack.dev');
  }
  return merge(common, config);
};
