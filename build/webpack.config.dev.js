const baseConfig = require('./webpack.config.base')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMerge = require('webpack-merge')

module.exports = WebpackMerge.merge(baseConfig, {
  devServer: {
    contentBase: './dist',
    inline: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, "../pubilc/index.html"),
      chunks: ['index']
    }),
  ]
})