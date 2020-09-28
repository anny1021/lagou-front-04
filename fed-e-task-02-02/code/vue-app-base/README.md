# vue-app-base

1. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
2. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
3. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
4. 尽可能的使用上所有你了解到的功能和特性

- webpack 相关的包
  - webpack
  - webpack-cli
  - webpack-dev-server
  - webpack-merge
- vue 文件解析
  - vue-loader
  - vue-template-compiler
- js 语法解析
  - @babel/core
  - @babel/preset-env
  - babel-loader
- 文件压缩
  - uglifyjs-webpack-plugin
- css
  - css-loader
  - style-loader
  - postcss-loader
  - autoprefixer
  - mini-css-extract-plugin
  - optimize-css-assets-webpack-plugin
- 图片 && 文件
  - file-loader
  - url-loader
  - image-webpack-loader
- 其他
  - html-webpack-plugin
  - clean-webpack-plugin
