const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, './app'),
    filename: 'index.js',
  },


  module: {
    rules: [
      {
        test: /\.(sass|css|scss)$/,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",

        ],
      },

      {

        test: /\.(svg|eot|woff|woff2|ttf)$/,

        exclude: /images/,

        use: [

          {

            loader: "file-loader", 

            options: {

              name: '[name].[ext]',

              outputPath: "assets/fonts",

            }

          }

        ]

      }

    ],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'app'),
    },
    // compress: true,
    port: 8001,
    devMiddleware: {writeToDisk: true,},
    open: true,
  },


  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
    template:"./index.html",
    filename: "index.html"
  }),
  new MiniCssExtractPlugin()
],
};
