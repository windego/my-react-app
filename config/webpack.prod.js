const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

//https://www.npmjs.com/package/prerender-spa-plugin
// 由于页面较少，且预渲染相对于SSH比较简单，于是选择预渲染页面，预渲染可以极大的提高网页访问速度。而且配合一些meat插件，基本可以
// 满足SEO需求
// const PrerenderSPAPlugin = require('prerender-spa-plugin')
//
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const paths = require('./paths');
module.exports = {
  mode: 'production',
  bail: true, //用HMR时，出现错误,但仍然继续进行打包
  devtool: 'source-map',
  output: {
    path: paths.appBuild,
    publicPath: paths.publicPath, //打包后静态文件前缀,托管地址
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js'
  },
  // optimization: {
  //   minimize: true,
  //   // This is only used in production mode
  //   minimizer: [
  //     new TerserPlugin({
  //       terserOptions: {
  //         parse: {
  //           ecma: 8
  //         },
  //         compress: {
  //           ecma: 5,
  //           warnings: false,
  //           comparisons: false,
  //           inline: 2
  //         },
  //         mangle: {
  //           safari10: true
  //         },
  //         keep_classnames: false,
  //         keep_fnames: false,
  //         output: {
  //           ecma: 5,
  //           comments: false,
  //           ascii_only: true
  //         }
  //       }
  //     }),
  //     // This is only used in production mode
  //     new OptimizeCSSAssetsPlugin({
  //       cssProcessorOptions: {
  //         parser: safePostCssParser,
  //         map: false
  //       }
  //     })
  //   ]
  // },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      title: 'React-Demo',
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    // new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
    }),
    // 生成一份资源清单的json文件
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);
        const entrypointFiles = entrypoints.main.filter(
          fileName => !fileName.endsWith('.map')
        );
        return {
          files: manifestFiles,
          entrypoints: entrypointFiles
        };
      }
    }),
    // Generate a service worker script that will precache, and keep up to date,
    // the HTML & assets that are part of the Webpack build.
    // 预缓存
    new GenerateSW({
      clientsClaim: true,
      exclude: [/\.map$/, /asset-manifest\.json$/],
      navigateFallback: paths.publicUrlOrPath + 'index.html',
      navigateFallbackDenylist: [
        // Exclude URLs starting with /_, as they're likely an API call
        new RegExp('^/_'),
        // Exclude any URLs whose last part seems to be a file extension
        // as they're likely a resource and not a SPA route.
        // URLs containing a "?" character won't be blacklisted as they're likely
        // a route with query params (e.g. auth callbacks).
        new RegExp('/[^/?]+\\.[^/]+$'),
      ],
    }),
  ]
};
