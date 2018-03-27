const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const ip = require('ip');
const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
const port = 3000;
const instance = webpackDevMiddleware(compiler, {
  logLevel:'warn',
  stats: {
    colors: true,
    modules: false,
  },
  publicPath: config.output.publicPath,
  lazy: false
});
app.use(instance);
app.use(webpackHotMiddleware(compiler));//热刷新

app.listen(port, function () {
  console.log(`http://localhost:${port}`);
  console.log(`http://${ip.address()}:${port}`);
});