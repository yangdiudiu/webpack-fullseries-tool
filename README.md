# airbnb javaScript Style Guide
practice javaScript Style Guide


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


