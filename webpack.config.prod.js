// For info about this file refer to webpack and webpack-hot-middleware documentation
// For info on how we're generating bundles with hashed filenames for cache busting: https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.w99i89nsz
import webpack from "webpack";
// import ExtractTextPlugin from "extract-text-webpack-plugin";
// import WebpackMd5Hash from "webpack-md5-hash";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

const GLOBALS = {
  "process.env.NODE_ENV": JSON.stringify("production"),
  __DEV__: false,
};

export default {
  resolve: {
    extensions: ["*", ".js", ".jsx", ".json"],
  },
  devtool: "source-map", // more info:https://webpack.js.org/guides/production/#source-mapping and https://webpack.js.org/configuration/devtool/
  entry: path.resolve(__dirname, "src/index"),
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    // filename: "assets/js/[name].[chunkhash].js",
    filename: "assets/js/[name].[contenthash].js",
  },
  plugins: [
    // Hash the files using MD5 so that their names change when the content changes.
    // new WebpackMd5Hash(),

    // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    new webpack.DefinePlugin(GLOBALS),

    // Generate an external css file with a hash in the filename
    // new ExtractTextPlugin("assets/css/[name].[contenthash].css"),
    new MiniCssExtractPlugin(),

    // Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
    new HtmlWebpackPlugin({
      template: "src/index.ejs",
      favicon: "src/assets/images/favicon.ico",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),

    // Minify JS
    // new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
  ],
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "assets/fonts/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "application/font-woff",
              name: "assets/fonts/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "application/octet-stream",
              name: "assets/fonts/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "image/svg+xml",
              name: "assets/images/[name].[ext]",
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/images/[name].[ext]",
              esModule: false,
            },
          },
        ],
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
        // use: ExtractTextPlugin.extract({
        //   use: [
        //     {
        //       loader: "css-loader",
        //       options: {
        //         minimize: true,
        //         sourceMap: true,
        //       },
        //     },
        //     {
        //       loader: "postcss-loader",
        //       options: {
        //         plugins: () => [require("autoprefixer")],
        //         sourceMap: true,
        //       },
        //     },
        //     {
        //       loader: "sass-loader",
        //       options: {
        //         includePaths: [path.resolve(__dirname, "src", "scss")],
        //         sourceMap: true,
        //       },
        //     },
        //   ],
        // }),
      },
    ],
  },
};
