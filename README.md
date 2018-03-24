# airbnb javaScript Style Guide
practice javaScript Style Guide

---

# babel编译转换标准通用语法

> 项目中可以使用最新javascript版本语法，但是浏览器并不完全支持，为了浏览器能够支持所以需要编译转换为浏览器的支持的标准语法，所以babel是不二首选
- ## webpack4的babel配置
1. 安装babel核心、模块解析包以及预处理器

```
npm install --save-dev babel-core babel-loader babel-preset-env
```
2. 配置模块解析包（配置文件例如：webpack.config.js）以及预处理器（.babelrc）

```
rules: [
  {
    test: /\.js|jsx$/,
    exclude: /node_modules/,
    use: [
      "babel-loader"
    ]
  },
]
```

```
{
  "presets": ["env"]
}
```
- ## 不支持新的通用标准以及原生语法怎么办？比如Promise
1. babel-polyfill的cdn方式，放在html head标签里靠前位置
```
<script src="https://cdn.bootcss.com/babel-polyfill/6.26.0/polyfill.min.js"></script>
```
2. babel-polyfill的npm方式（两种）
```
npm i babel-polyfill --save-dev
```
&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;方法1：在入口文件最顶部
```
import 'babel-polyfill'
```
&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;方法2：配置入口文件，比如：
```
entry: {
    app: [
      'babel-polyfill',
      './src/index'
    ]
  },
```
---


# 按需加载
> 有时候项目需要为了提高首次载入速度而需要按需加载，比如react-router的按需加载
- ## webpack4项目配置
1. babel-plugin-syntax-dynamic-import插件

```
npm install --save-dev babel-plugin-syntax-dynamic-import
```
2. 配置.babelrc

```
{
  "plugins": ["syntax-dynamic-import"]
}
```

3. webpack生产环境中的output配置

```
{
    ...
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
}
```

- ## 按需加载的写法
1. import
```
function getComponent() {
  return import('lodash').then(_ => {
    var element = document.createElement('div');
    return element;
  }).catch(error => console.log(error));
}
getComponent().then(component => {
  console.log(component);
});
```
2. async

```
async function getComponent() {
  const bundle = await import('lodash');
  return bundle;
}
getComponent().then(bundle => {
  console.log(bundle.default)
});
```
3.require

```
require.ensure([], function(require) {
  let bundle = require("lodash");
  console.log(bundle);
}, 'bundle');
```


