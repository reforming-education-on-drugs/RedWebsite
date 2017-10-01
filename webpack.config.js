const Webpack = require('webpack');
const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const BUILD_DIR = Path.resolve(__dirname, 'src/public');
const APP_DIR = Path.resolve(__dirname, 'src/app');

const config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'assets/js/bundle.js'
  },
  devServer: {
    contentBase: BUILD_DIR,
    compress: true,
    port: 8000,
    stats: 'errors-only',
    historyApiFallback: true,
    open: true,
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader',
        exclude: /node_modules/,
        query: { presets: ['es2015', 'react'] }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: APP_DIR + '/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
  ]
};

module.exports = config;