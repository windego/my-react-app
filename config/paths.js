const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const getPublicUrl = appPackageJson => require(appPackageJson).homepage || '/';
//   "homepage": "https://react-ts.oss-cn-beijing.aliyuncs.com/",

const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL,
);

const generateAlias = () => {
  const {
    compilerOptions: { baseUrl: tsConfigBaseUrl, paths: tsConfigPaths },
  } = require(resolveApp('tsconfig.json'));

  const aliasNameRegex = /^(@\w+)\/\*$/;
  const aliasPathRegex = /^(\*)$|^([\w/]+)\/\*$/;

  return Object.entries(tsConfigPaths).reduce((allAlias, [aliasName, aliasPath]) => {
    const nameMatches = aliasNameRegex.exec(aliasName);

    if (nameMatches) {
      const [, name] = nameMatches;

      const [, basePath, specificPath] = aliasPathRegex.exec(aliasPath.toString());

      if (basePath) {
        return { ...allAlias, [name]: resolveApp(tsConfigBaseUrl) };
      }
      if (specificPath) {
        return {
          ...allAlias,
          [name]: resolveApp(path.join(tsConfigBaseUrl, specificPath)),
        };
      }
    }
    return allAlias;
  }, {});
};

const moduleFileExtensions = ['ts', 'tsx', 'json', 'mjs', 'js', 'jsx', 'scss'];

module.exports = {
  appPath: resolveApp('.'),
  appPublic: resolveApp('public'),
  appIndex: resolveApp('src/index.tsx'),
  appBuild: resolveApp('build'),
  publicPath: getPublicUrl(resolveApp('package.json')),
  alias: generateAlias(),
  appNodeModules: resolveApp('node_modules'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appHtml: resolveApp('public/index.html'),
  appTsConfig: resolveApp('tsconfig.json'),
  stylelintrc: resolveApp('.stylelintrc.js'),
  yarnLockFile: resolveApp('yarn.lock'),
  antdStyle: resolveApp('src/assets/styles/antd.global'),
  publicUrlOrPath,

  //
  // appDist: resolveApp('dist'),
  //
  //
  // ,
  // appStatic: resolveApp('src/static'),
  // appNodeModules: resolveApp('node_modules'),
  // appTsConfig: resolveApp('tsconfig.json'),

  //

  // proxy: resolveApp('config/.proxyrc.js'),
};
module.exports.moduleFileExtensions = moduleFileExtensions;
