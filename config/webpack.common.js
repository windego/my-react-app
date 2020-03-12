const webpack = require('webpack');
const resolve = require('resolve');
const os = require('os');
const WebpackBar = require('webpackbar');
const chalk = require('react-dev-utils/chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');

//本地
const paths = require('./paths.js');
const { getStyleLoaders } = require('./utils.js');
const getClientEnvironment = require('./env');

//
const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

// 一些比较大，排除出 common 模块的包
const shouldExcludeFromCommon = new RegExp(
  [
    'echarts',
    'zrender',
    'antd-mobile',
    'jquery',
    'braft-.',
    'react-syntax-highlighter',
    'highlight\\.js',
    'refractor',
    'react-pdf',
    'pdfjs-dist'
  ].join('|')
);

// style files regexes
const cssRegex = /\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassGlobalRegex = /\.global\.(scss|sass)$/;

module.exports = {
  bail: false, //用 HMR 时，webpack 会将在终端以及浏览器控制台中，以红色文字记录这些错误
  entry: [paths.appIndex],
  output: {
    publicPath: '/'
  },
  resolve: {
    // 自动解析的扩展
    extensions: paths.moduleFileExtensions.map(ext => `.${ext}`),
    // 别名
    alias: {
      ...paths.alias
      // 'react-dom': '@hot-loader/react-dom'
    },
    // 添加一个目录到模块搜索目录
    modules: ['node_modules', paths.appNodeModules],
    plugins: [new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])]
  },
  optimization: {
    minimize: isEnvProduction,
    // usedExports 不导出未使用的代码 ,默认dev prod都开启
    usedExports: true,

    // Keep the runtime chunk separated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    // https://github.com/facebook/create-react-app/issues/5358
    // runtimeChunk:会为每个仅含有 runtime 的入口起点添加一个额外 chunk;
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
      // name: 'runtime'// 值 "single" 会创建一个在所有生成 chunk 之间共享的运行时文件
    },

    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    // splitChunks: {
    //   chunks: 'all',
    //   name: false,
    // },
    splitChunks: {
      /*
          chunks的含义是拆分模块的范围，"initial" | "all"(推荐) | "async(默认)。
          async表示只从异步加载得模块（动态加载import()）里面进行拆分
          initial表示只从入口模块进行拆分
          all表示以上两者都包括,异步和非异步块之间也可以共享块
         */
      chunks: 'all',
      minSize: 30000, //生成块的最小大小（以字节为单位）
      minChunks: 1,
      maxAsyncRequests: 6, // 最大异步请求数
      maxInitialRequests: 4, // 最大初始化请求数
      automaticNameDelimiter: '-', // 打包分隔符
      automaticNameMaxLength: 30,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          // name: "vendor",
          priority: -10,
          enforce: true
        },
        lazy: {
          test: ({ resource }) => {
            return /antd/.test(resource);
          },
          chunks: 'async',
          // name: 'lazy',
          priority: 10,
          enforce: true
        },
        commons: {
          chunks: 'all',
          test: ({ resource }) => {
            return (
              /[\\/]node_modules[\\/]/.test(resource) &&
              !shouldExcludeFromCommon.test(resource)
            );
          },
          name: 'common',
          minChunks: 3,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 20
        }
      }
    }
  },

  module: {
    strictExportPresence: true, //表明文件中如果缺少exports时会直接报错而不是警告。
    rules: [
      {
        test: /\.(ts|tsx)$/,
        enforce: 'pre',
        // enforce(执行顺序) pre 优先处理>normal（默认）>inline 其次处理>post 最后处理
        exclude: /node_modules/,
        include: paths.appSrc,
        use: [
          {
            loader: require.resolve('eslint-loader'),
            options: {
              fix: true, //启动时格式化代码
              cache: true, //开启缓存
              formatter: require.resolve('react-dev-utils/eslintFormatter'),
              eslintPath: require.resolve('eslint')
              // resolvePluginsRelativeTo: __dirname
            }
          }
        ]
      },
      {
        //oneOf:数组，当规则匹配时，只使用第一个匹配规则。
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: '10000',
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },

          {
            test: /\.(ts|tsx)$/,
            use: [
              {
                loader: 'thread-loader',
                options: {
                  workers: os.cpus().length
                }
              },
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    '@babel/preset-typescript',
                    '@babel/preset-react',
                    [
                      '@babel/preset-env',
                      { // Allow importing core-js in entrypoint and use browserlist to select polyfills
                        useBuiltIns: 'entry',
                        // Set the corejs version we are using to avoid warnings in console
                        // This will need to change once we upgrade to corejs@3
                        corejs: 3,
                        // Do not transform modules to CJS
                        modules: false,
                        // Exclude transforms that make all code slower
                        exclude: ['transform-typeof-symbol'],
                      }
                    ]
                  ],
                  plugins: [
                    [
                      //svg 
                      require.resolve('babel-plugin-named-asset-import'),
                      {
                        loaderMap: {
                          svg: {
                            ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
                          },
                        },
                      },
                    ],
                    [
                      '@babel/plugin-transform-runtime',
                      {
                        version: require('@babel/runtime/package.json').version,
                        absoluteRuntime: false,
                        corejs: false,
                        helpers: false,
                        regenerator: true, // generator不会污染全局的
                        useESModules: true,
                      }
                    ],
                    '@babel/plugin-syntax-dynamic-import',
                    // true是less， 可以写'css' 如果不用less
                    // babel-plugin-import
                    [
                      'import',
                      {
                        libraryName: 'antd',
                        libraryDirectory: 'es',
                        style: 'css'
                      }
                    ]
                  ],
                  cacheDirectory: true
                }
              }
            ]
          },
          {
            test: cssRegex,
            use: getStyleLoaders({
              importLoaders: 1
            }),
            sideEffects: true
          },
          // SASS 默认开启 modules
          {
            test: sassRegex,
            exclude: sassGlobalRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                modules: {
                  localIdentName: '[path][local]--[hash:base64:5]'
                }
              },
              'sass-loader'
            ),
            sideEffects: true
          },
          // 全局sass配置 .global.scss or .global.sass
          {
            test: sassGlobalRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2
              },
              'sass-loader'
            )
          },
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
          // ** STOP ** Are you adding a new loader?
        ]
      }
    ]
  },
  plugins: [
    // 打包进度
    // new WebpackBar({ name: 'React-App' }),
    new ProgressBarPlugin({
      format: chalk.blue.bold('  build [:bar] ') + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    }),
    // 只会打包本地化内容
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
    // It will be an empty string unless you specify "homepage"
    // in `package.json`, in which case it will be the pathname of that URL.
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),

    // This gives some necessary context to module not found errors, such as
    // the requesting resource.
    new ModuleNotFoundPlugin(paths.appPath),

    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV is set to production
    // during a production build.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin(env.stringified),

    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: paths.publicUrlOrPath,
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
          entrypoints: entrypointFiles,
        };
      },
    }),


    new ForkTsCheckerWebpackPlugin({
      typescript: resolve.sync('typescript', {
        basedir: paths.appNodeModules
      }),
      async: isEnvDevelopment,
      useTypescriptIncrementalApi: true,
      checkSyntacticErrors: true,
      resolveModuleNameModule: process.versions.pnp
        ? `${__dirname}/pnpTs.js`
        : undefined,
      resolveTypeReferenceDirectiveModule: process.versions.pnp
        ? `${__dirname}/pnpTs.js`
        : undefined,
      tsconfig: paths.appTsConfig,
      reportFiles: [
        '**',
        '!**/__tests__/**',
        '!**/?(*.)(spec|test).*',
        '!**/src/setupProxy.*',
        '!**/src/setupTests.*'
      ],
      silent: true,
      // The formatter is invoked directly in WebpackDevServerUtils during development
      formatter: isEnvProduction ? typescriptFormatter : undefined
    })
  ],
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
