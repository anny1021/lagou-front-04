const { merge } = require('webpack-merge');
const env = require('./env');
const base = require("./webpack.common");
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = merge(base, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash:5].js',
    path: path.resolve(__dirname, './dist'),
    chunkFilename: 'js/[name].[chunkhash].js',
    publicPath: './',
  },
  optimization: {
    // 将引入的第三方库文件单独打包
    // 对代码进行代码分割，生成公共包
    splitChunks: {
      // 所有引入的文件都打包
      chunks: 'all',
      minSize: 0, // 生产块的最小大小
      maxSize: 0,
      name: true,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_module[\\/]/,
          priority: -10,
          chunks: 'initial',
          minChunks: 2
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        sourceMap: env === 'development',
        terserOptions: {
          cache: true,
          compress: {
            drop_debugger: true,
            drop_console: true
          }
        }
      })
    ]
  },
  stats: {
    modules: false,
    source: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          //=>转换的语法预设（ES6->ES5）
          presets: [
            "@babel/preset-env"
          ],
          //=>基于插件处理ES6/ES7中CLASS的特殊语法
          plugins: [
            ["@babel/plugin-proposal-decorators", {
              "legacy": true
            }],
            ["@babel/plugin-proposal-class-properties", {
              "loose": true
            }],
            "@babel/plugin-transform-runtime"
          ]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            // 使用MiniCssExtractPlugin.loader替代style-loader
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 解决图片路径不对的问题
              publicPath: '../'
            }
          },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          // "postcss-loader",
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  require('autoprefixer')
                ]
              }
            }
          },
          "less-loader"
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: 'imgs/[name].[contenthash:5].[ext]',
              outputPath: 'images'//控制打包后图片所在的目录
            }
          },
          {
            // 对图片进行压缩处理，配置项参考官方文档
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        //=>处理文件中导入的IMG图片
        test: /\.(html|htm|xml)$/i,
        use: ['html-withimg-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin(
      {
        patterns: [
          {
            from: path.resolve(__dirname, 'src/assets/**/*'),
            to: path.resolve(__dirname, 'dist/'),
          },
          {
            from: path.resolve(__dirname, 'public/**/*.ico'),
            to: path.resolve(__dirname, 'dist/'),
            flatten: true,
          }
        ]
      }
    ),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:5].css'
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          // 去除debugger和console
          drop_debugger: true,
          drop_console: true
        }
      },
      cache: true,
      parallel: true,
      sourceMap: false
    }),
    new ProgressBarPlugin(
      {
        format: 'build [:bar] :percent (:elapsed seconds)',
        clear: false,
        width: 60,
        callback: function (res) {
          console.log('打包完成');
        }
      }
    ),//打包进度条
  ],
});
