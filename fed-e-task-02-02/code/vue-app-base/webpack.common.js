const path = require("path");
const env = require('./env');
const webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = env === 'production';
module.exports = {
  entry: {
    index: path.resolve(__dirname, './src/main.js'),
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    chunkFilename: 'js/[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            // limit: 8192,
            name: 'images/[name].[ext]?[hash]',
            outputPath: 'assets',
            fallback: 'responsive-loader',
            limit: 4096,
            quality: 50,
          }
        }
      },
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader', // eslint-loader
      },
      {
        enforce: 'pre',
        test: /\.(vue|js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // 自动将静态资源引入html文件中
    new HtmlWebpackPlugin({
      url: path.resolve(__dirname, 'dist'),
      filename: 'index.html',
      template: path.resolve(__dirname, 'public/index.html'), //模板文件
      options: {
        title: 'webpack-title-xinxin'
      },
      minify: isProd ? {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true
      } : {}
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env),
      BASE_URL: path.resolve(__dirname, 'dist')
    }),
  ],
  resolve: {
    enforceExtension: false,  // false可以不带扩展
    extensions: ['*', '.js', '.vue', '.less', '.css'], //后缀名自动补全
    alias: { //别名
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'src/assets')
    }
  },
};
