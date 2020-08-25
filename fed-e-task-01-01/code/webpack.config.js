const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  stats: 'none',
  devtool: 'source-map',
  plugins: [new HtmlWebpackPlugin()],
};
