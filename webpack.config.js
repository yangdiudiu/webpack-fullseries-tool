const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
const MinifyPlugin = require("babel-minify-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
console.log('NODE_ENV: ', process.env.NODE_ENV);
let config = {
  entry: {},
  output: {},
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
  ],
  resolve: {
    alias: {
      statics: path.resolve(__dirname, 'src/statics')
    },
    extensions: ['.js', '.json', '.tsx', '.ts',]
  },
  externals: [],
  stats: {
    colors: true,
    modules: false,
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: [
          "babel-loader"
        ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',// minifying your images
            options: {
              bypassOnDebug: true,
            },
          },
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader?name=[hash].[ext]',
            options: {
              limit: 10000
            }
          },
          'file-loader'
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  }
};
switch (process.env.NODE_ENV) {
  case 'development':
    config.entry = {
      index: [
        hotMiddlewareScript,
        './src/index'
      ]
    };
    config.output.publicPath = '/';
    config.devtool = 'eval-source-map';
    config.mode = 'development';
    config.optimization = {
      noEmitOnErrors: true
    };
    config.plugins = config.plugins.concat(
      new webpack.HotModuleReplacementPlugin()
    );
    config.module.rules = config.module.rules.concat(
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
    );
    break;
  case 'production':
    config.entry = {
      index: [
        './src/index'
      ]
    };
    config.plugins = config.plugins.concat(
      new CleanWebpackPlugin(['dist']),
      new MinifyPlugin(),
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    );
    config.mode = 'production';
    config.output = {
      filename: 'js/[name].bundle.js',
      chunkFilename: 'js/[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: "",//相对于HTML页面解析的输出目录的url
    };
    config.optimization = {
      splitChunks: {
        chunks: 'all',
        name: 'common'
      },
      runtimeChunk: {
        name: 'runtime'
      }
    };
    config.cache = true;
    config.module.rules = config.module.rules.concat(
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
    );
    break;
  default:
    break;
}


module.exports = config;