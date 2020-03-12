// 启用一个服务器
const express = require('express');
const webpack = require('webpack');

// 创建一个服务器
const app = express();

// 配置启动路径
const staticMiddleware = express.static('dist');

// 监听代码
const config = require('../../config/webpack.config');
const compiler = webpack(config);

const webpackDevMiddleware = require('webpack-dev-middleware')(
  compiler,
  config.devServer
);

// 热更新
const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

app.use(webpackDevMiddleware);
app.use(webpackHotMiddleware); // 位置要在webpackDevMiddleware 之下&&在staticMiddleware之上
app.use(staticMiddleware);

// debugger;

app.listen(3000, () => {
  console.log('node server is running....');
});
