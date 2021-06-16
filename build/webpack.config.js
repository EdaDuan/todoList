const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ],
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/, //是匹配图片文件后缀名
        use: [{
          loader: 'url-loader', //指定使用的loader和loader的配置参数
          options: {
            name: 'imgs/[name].[hash:8].[ext]',
            limit: 1024,
            esModule: false,
          }
        }]
      },
      {
        test: /\.html$/,
        loader: ['html-withimg-loader']
      }
    ]
  },
  plugins: [
    // new uglify()
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      minify: {//对html文件进行压缩
        removeAttributeQuotes: true //removeAttrubuteQuotes是去掉属性的双引号。
      },
      filename: "index.html", // 生成的文件夹名
      template: path.resolve(__dirname, "../src/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  // webpack开发服务器功能
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),//设置基本目录结构
    compress: true,//服务端压缩是否开启
    port: '8080' //配置服务端口号
  }
}