/* eslint-disable */
const Webpack = require('webpack');
const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const BUILD_DIR = Path.resolve(__dirname, 'src/public');
const APP_DIR = Path.resolve(__dirname, 'src/app');

const config = {
  entry: APP_DIR + '/Main.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'assets/js/bundle.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: BUILD_DIR,
    compress: false,
    port: 8080,
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
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: { limit: 10000 }
      }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'RED | Reforming Education on Drugs',
      template: APP_DIR + '/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ]
};

module.exports = config;