const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
const MinifyPlugin = require("babel-minify-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
console.log('NODE_ENV: ', process.env.NODE_ENV);
let config = {
  entry: {

  },
  output: {},
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/static/',
        to: 'static/',
        toType: 'dir'
      }
    ], {

    }),
    new ManifestPlugin({
      fileName:'assets/static_list.json',
      filter:function (obj) {
        return obj.path.indexOf('assets/')>-1
      }
    }),

  ],
  resolve: {
    alias: {
      static: path.resolve(__dirname, './src/static'),
      tools:path.resolve(__dirname, './src/tools'),
      styles:path.resolve(__dirname, './src/styles')
    },
    extensions: ['.js', '.json','.tsx', '.ts',]
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
      },{
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "less-loader"
        }]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader:'file-loader',
            options: {
              name:'assets/[hash].[ext]',
              publicPath:'../',
            }
          },
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
if(process.env.NODE_ENV==='development'){
  config.entry = {
    index: [
      hotMiddlewareScript,
      './src/index'
    ]
  };
  config.output.publicPath = '/';
  config.devtool = 'eval-source-map';
  config.mode = 'development';
  config.optimization={
    noEmitOnErrors:true
  };
  config.plugins = config.plugins.concat(
    new webpack.HotModuleReplacementPlugin()
  );
  config.module.rules=config.module.rules.concat(
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
  );
}else{
  config.entry = {
    index: [
      './src/index'
    ]
  };
  config.plugins = config.plugins.concat(
    new CleanWebpackPlugin(['dist']),
    new MinifyPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name].css"
    })
  );
  config.mode = 'production';
  config.output = {
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "",//相对于HTML页面解析的输出目录的url
  };
  config.optimization={
    splitChunks:{
      chunks:'all',
      name:'common'
    },
    runtimeChunk:{
      name:'runtime'
    }
  };
  config.cache = true;
  config.module.rules=config.module.rules.concat(
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
  );
}
process.env.NODE_ENV === 'analyze' && config.plugins.push(new BundleAnalyzerPlugin());
module.exports = config;