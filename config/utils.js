/*  mini-css-extract-plugin：
    把js中import导入的样式文件，单独打包成一个css文件，
    结合html-webpack-plugin，以link的形式插入到html文件中。
    此插件不支持HMR，若修改了样式文件，是不能即时在浏览器中显示出来的，需要手动刷新页面。 
*/
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const postcssNormalize = require('postcss-normalize');

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve('style-loader'),
    // isEnvProduction && {
    //   loader: MiniCssExtractPlugin.loader,
    //   // options: {
    //   //   hmr: isEnvDevelopment,
    //   // },
    // },
    {
      loader: require.resolve('css-loader'),
      options: {
        ...cssOptions,
        localsConvention: 'dashes',
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          // PostCSS规范化 从browserslist中使用 normalize.css 所需的部分
          postcssNormalize(),
        ],
        sourceMap: isEnvProduction,
      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(
      {
        loader: require.resolve('resolve-url-loader'),
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: true,
        },
      },
    );
  }
  return loaders;
};

module.exports = { getStyleLoaders };
