const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');

const paths = require('./paths');
const getClientEnvironment = require('./env');

const env = getClientEnvironment('');

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: paths.appPublic,
    publicPath: '/',
    port: 8080,
    hot: true,
    compress: true,
    historyApiFallback: true,
    inline: true
  },
  // entry: [require.resolve('react-dev-utils/webpackHotDevClient')], //入口], //载入热更新
  output: {
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js'
  },
  devtool: 'cheap-eval-source-map', //
  watch: true, // 只有在开启监听模式时，watchOptions才有意义
  watchOptions: {
    ignored: /node_modules/, //排除一些巨大的文件夹
    aggregateTimeout: 300, // 监听到变化发生后等300ms再去执行动作，防止文件更新太快导致编译频率太高
    poll: 1000 // 通过不停的询问文件是否改变来判断文件是否发生变化，默认每秒询问1000次
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),
    // new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime/]),
    // new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
    //   PUBLIC_URL: ''
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    // 在  plugins 中添加如下配置
    new StyleLintPlugin({
      context: 'src',
      configFile: paths.stylelintrc,
      failOnError: false,
      files: ['**/*.s?(a|c)ss'],
      quiet: true,
      fix: true,
      syntax: 'less'
    })
  ]
};
