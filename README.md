## 为什么是用 webpack

    ```<script>``` 标签之间存在隐式依赖关系
    使用这种方式去管理 JavaScript 项目会有一些问题：

    1. 无法立即体现，脚本的执行依赖于外部扩展库(external library)。
    2. 如果依赖不存在，或者引入顺序错误，应用程序将无法正常运行。
    3. 如果依赖被引入但是并没有使用，浏览器将被迫下载无用代码。
    4. 将动态打包(dynamically bundle)所有依赖项（创建所谓的依赖图(dependency graph)）
    5. 对于JavaScript 的优点（例如显式依赖），同样可以用来构建网站或 web 应用程序中的所有非 JavaScript 内容

## npx

    不再需要全局安装webpack;
    注意，使用 npm 的 scripts，我们可以像使用 npx 那样通过模块名引用本地安装的 npm 包。这是大多数基于 npm 的项目遵循的标准，因为它允许所有贡献者使用同一组通用脚本（如果必要，每个 flag 都带有 --config 标志）。

# webpack react

## 一.基础配置

### 1.init 项目

```
mkdir react-webpack-new
cd react-webpack-new
mkdir src
mkdir dist
npm init -y
```

### 2.安装 webpack

```
yarn add webpack  webpack-cli webpack-dev-server -D
mkdir config
touch config/webpack.common.config.js
// webpack.common.config.js初始化内容
module.exports = {
    mode: 'developement',
    entyr: ['./src/index.js'],
    output: {
        // 输出目录
        path: paths.appBuild
    },
    module: {},
    plugins: [],
    devServer: {}
};

```

### 3.安装 react react-dom

```
yarn add react react-dom
```

### 4.babel 编译 ES6,JSX 等

```
// @babel/core-babel  核心模块
// @babel/preset-env  编译ES6等
// @babel/preset-react  转换JSX
// @babel/plugin-transform-runtime 避免 polyfill 污染全局变量，减小打包体积
// @babel/polyfill  ES6 内置方法和函数转化垫片
yarn add babel-loader @babel/core @babel/preset-env  @babel/plugin-transform-runtime   @babel/preset-react -D

cnpm i @babel/polyfill @babel/runtime
 {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
        {
        loader: "babel-loader"
        }
    ]
}


```

### env 配置
