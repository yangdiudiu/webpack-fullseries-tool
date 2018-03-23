const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

const instance = webpackDevMiddleware(compiler, {
  logLevel:'warn',
  // stats: {
  //   colors: true,
  //   modules: false,
  // },
  publicPath: config.output.publicPath,
  lazy: false
});
app.use(instance);
app.use(webpackHotMiddleware(compiler));//热刷新

app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});