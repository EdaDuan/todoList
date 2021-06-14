const baseConfig = require('./webpack.config.base')
const path = require('path')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMerge = require('webpack-merge')

module.exports = WebpackMerge.merge(baseConfig, {
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: path.resolve(__dirname, "../pubilc/index.html"),
      chunks: ['index'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true
      }
    }),
  ]
})