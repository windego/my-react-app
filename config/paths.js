const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

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

      const [, basePath, specificPath] = aliasPathRegex.exec(aliasPath);

      if (basePath) {
        return { ...allAlias, [name]: resolveApp(tsConfigBaseUrl) };
      }
      if (specificPath) {
        return { ...allAlias, [name]: resolveApp(path.join(tsConfigBaseUrl, specificPath)) };
      }
    }
    return allAlias;
  }, {});
};

module.exports = {
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appDist: resolveApp('dist'),
  appHtml: resolveApp('public/index.html'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appStatic: resolveApp('src/static'),
  appNodeModules: resolveApp('node_modules'),
  appTsConfig: resolveApp('tsconfig.json'),
  alias: generateAlias(),
  stylelintrc: resolveApp('.stylelintrc.js'),
  antdStyle: resolveApp('src/assets/styles/antd.global'),
  proxy: resolveApp('config/.proxyrc.js'),
};
