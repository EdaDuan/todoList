const path = require('path')
const rootPath = path.join(__dirname, "../");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      "@": rootPath,
    },
    extensions: [
      ".jsx",
      ".json",
      ".js",
      ".vue",
      ".ts",
      ".d.ts",
      ".tsx",
      ".scss",
    ],
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     "style-loader",
      //     "css-loader"],
      // },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[contenthash].[ext]",
              outputPath: "static/img",
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
    ]
  },
  devServer: {
    contentBase: './dist',
    inline: true,
    port: 8080, // 启动服务端口
  },
}