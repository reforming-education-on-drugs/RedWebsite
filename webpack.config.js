const Webpack = require('webpack');
const Path = require('path');

const BUILD_DIR = Path.resolve(__dirname, 'src/public');
const APP_DIR = Path.resolve(__dirname, 'src/app');

var config = {
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
  plugins: []
};

module.exports = config;