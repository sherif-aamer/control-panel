const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry:  {
    'app':    './src/index.js',
    'assets/js/banner': './src/assets/js/banner.js',
  },

  output: {
    publicPath: '/',
    path: path.resolve(__dirname, './app'),
    filename: '[name].js',
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
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
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
  new HtmlWebpackPlugin({
    template:"./src/components/button.html",
    filename: "components/button.html",
    chunks: ['app']
  }),
  new HtmlWebpackPlugin({
    template:"./src/components/textfield.html",
    filename: "components/textfield.html",
    chunks: ['app']
  }),
  new HtmlWebpackPlugin({
    template:"./src/components/card.html",
    filename: "components/card.html",
    chunks: ['app']
  }),
  new HtmlWebpackPlugin({
    template:"./src/components/banner.html",
    filename: "components/banner.html",
    chunks: ['app', 'assets/js/banner']
  }),
  new MiniCssExtractPlugin()
],
};
