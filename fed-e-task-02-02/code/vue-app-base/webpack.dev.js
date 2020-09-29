const { merge } = require("webpack-merge");
const base = require("./webpack.common");
const webpack = require("webpack");
const path = require('path');
const apiMocker = require('webpack-api-mocker');


module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // 入口页面所在文件夹
    contentBase: path.resolve(__dirname, 'src'),
    host: 'localhost',
    hot: true,
    compress: true, //启用压缩
    noInfo: true,
    historyApiFallback: true,
    // 在浏览器显示错误和警告
    overlay: {
      warnings: true,
      errors: true
    },
    before: function (app) {
      apiMocker(app, path.resolve('mockData/mocker.js'));
    },
    // 去除掉每次修改时，控制台的日志
    clientLogLevel: 'none',
    port: 1234,     //端口
    open: true,    //自动打开浏览器
    // host: '0.0.0.0', // 让同网域其他设备访问本地服务
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist/')
  }
});
