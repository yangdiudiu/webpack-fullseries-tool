const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'APP'
    })
  ],
  resolve: {
    alias: {
      statics: path.resolve(__dirname, 'src/statics')
    },
    extensions: ['.js', '.json']
  },
  module: {
    
    rules: [
      {
        test: /\.js$/, exclude: /node_modules/,
        use: [
          "babel-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
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
          {
            loader: 'url-loader',// return a DataURL if the file is smaller than a byte limit
            options: {
              limit: 8192
            }
          }
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