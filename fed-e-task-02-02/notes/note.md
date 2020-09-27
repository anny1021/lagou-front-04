- webpack 4.0
  - 多线程打包
    - export 为数组，值为多个 entry 的单个webpack 的值
  - webpack-dev-server
    - proxy 配置
      ```javascript
      proxy:{
        '/api':{ // 匹配请求地址
          target:'', // 转换后的地址
          pathRewrite: { // api 地址重写
            '^/api': ''
          },
          // 不使用 localhost:8080 的主机名称
          changeOrigin: true
        }
      }
      ```
    - source map -> 调试 prod 的代码 -> dev 代码 与 prod 代码的关系
      - prod 与 dev 代码之间的关系
      - min 压缩之后的文件  与 source map 文件之间的关系
        - 语法
        ```js
        //# sourceMappingURL=sourceMap 文件的路径地址
        ```
      - sourceMap 的配置
        - webpack source map 的 支持 有12种
        - 支持最好的调试方式，时间最慢
        - 使用
          ```javascript
            devtool:'source-map' // 官网有对应的数值

            /*
            * eval 只能定位源代码文件
            * cheap-eval-source-map loader打包之后的代码
              [推荐-调试]cheap-module-eval-source-map 与手写代码一致
              [prod环境]none
              eval-source-map
              cheap-source-map
              cheap-module-source-map
              inline-cheap-source-map
              inline-cheap-module-source-map
              source-map 完美的-最慢的
              inline-source-map
              hidden-source-map 有 source-map 但是没有 source map 的饮用
              [prod环境]nosources-source-map 无源码的 source-map，保护源代码

              // 以下为 webpack 5.0 添加
              eval-nosources-source-map
              eval-nosources-cheap-source-map
              eval-nosources-cheap-module-source-map
              inline-nosources-source-map
              inline-nosources-cheap-source-map
              inline-nosources-cheap-module-source-map
              hidden-nosources-source-map
              hidden-nosources-cheap-source-map
              hidden-nosources-cheap-module-source-map
              hidden-cheap-source-map
              hidden-cheap-module-source-map
              nosources-cheap-source-map
              nosources-cheap-module-source-map
            */
          ```
  - HMR 自动刷新 -> 有条件的 -> 模块热替换 只将修改的代码模块替换
    - 自动刷新，保持页面状态 -> 保留编辑器中交互的内容
    - 配置
    ```javascript

    // 开启
    // 1. webpack 命令行开启
    --hot
    // 2. 配置文件开启
    // 2.1 devSever 配置
    devSever:{
      hot: true
    }
    // 2.2 添加 webpack 内置插件
    new webpack.HotModuleReplacementPlugin()
    // 全模块的 热替换 -> 需要手动处理模块热替换 逻辑
    // 3.1 样式文件的 热更新 开箱即用
    // - 样式文件的 style-loader 自己处理了样式代码 热更新
    // - 样式文件修改后，将样式文件，直接替换原样式文件
    // - js 模块，没有规律，需要用户自己处理
    // - [除外]脚手架集成了热更新的代码,框架搭建的cli,自己处理了 热更新 js 文件
    // 3.2 js 文件的 热更新 -> js 热替换没有通用的方案
    // - hmr API
    module.hot.accept('依赖模块的路径',()=>{
      // '依赖模块的参数'
    })
    ```
  - 不同的配置文件
  - 插件
    - DefinePlugin 注入自定义变量 到 项目中
    - Tree Shaking -> prod 自动开启
    - sideEffects 标注是否有副作用
      package.json
      webpack.config.js
    - 模块化打包
      动态导入
      魔法注释
    - MiniCssExtractPlugin
      丑化，压缩 可在 optimization 配置自定义压缩 方式
      -> 配置之后，js 文件也需要自己配置
    - 输出文件名 Hash
      - Hash
      - chunkHash
      - contentHash
      - :长度 标识 需要几位的 hash 值，推荐为 8 位

- Rollup
  - 无 HMR
  - 适合 纯生产打包
  - 一般用于 框架 && 类库

- Parcel
  - install package && build && dev 结合在一起的，打包软件

- Eslint
  - 初始化eslint 文件，eslint --init yes
  - gulp
    - eslint 配置文件
    - 在 babel 之前，使用 eslint 检查
    ```javascript
    pipe()
    ```
  - webpack
