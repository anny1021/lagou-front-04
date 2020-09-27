### 简答题答案以及说明

- 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
  - 答：
    - 构建的主要环节
      - 解析 webpack 命令
        一般会使用 webpack-cli 命令行，直接执行 webpack 
      - 解析 webpack 配置文件
        - 推荐使用 webpack.config.js js 文件类型，作为 webpack 的配置文件
          - 使用 js 文件作为配置文件，可以使用 js 动态构建 配置
        - 推荐 配置文件，按照需要打包的作用，划分配置文件类型
          - 公共配置
          - 生产配置
          - 开发配置
          - 测试配置。。等
          - 通过 mode 识别当前的 配置文件类型
            - development 开发
            - production 生产 -》 默认开启压缩
            - none  无模式
      - 确定入口文件
        - webpack 支持 单入口，及多入口 两种模式
      - 编译模块，完成编译并输出
        - 通过 loader 和 plugins，对需要打包的文件，进行编译，转换，压缩，丑化，打包
        - loader 的配置，多用于编译
        - plugin 的配置，多用于打包过程中，处理的流程工程化的问题
          - html 模板配置
          - clear 清除 打包文件夹
          - bundle 分析 打包文件，更优配置
          - 开始多线程，打包配置
      - 输出完成
        - 配置 output 

- 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
  - Loader 和 Plugin 有哪些不同
    - loader
      - loader 为编译加载器，因为 webpack 只处理 原生的 js,css，img.本身不具有其他语言，.ts,.vue,.cjs,.mjs 直接转换为 浏览器可直接运行的文件，所以 loader 的作用是让 webpack 拥有多类型文件加载 及 解析非js 文件的能力。
      - 使用 loader，添加在 rules 中，类型为数组，每一个 loader 都是一个 object, 里面具体描述了 什么类型的文件(正则 test), 使用 什么加载(loader 或 use[]) 和loader 对应的 option 参数。
      - 开发 loader ，接收一个资源，最后将处理资源的结果返回出去。
    - plugin
      -  plugin 为插件，可以扩展 webpack 的功能，webpack 本身的运行 也会有生命周期的 的勾子事件，plugin 可以监听这些事件，在合适的事件，通过 webpack 提供的 api 改变输出结果。
      - plugin 在plugins 中单独，配置，每一个 plugin 为一个实例，参数通过构造的函数传入。
      - 开发 plugin，为一个可实例化的构造类，内部使用 webpack 提供的 生命周期 api ,在对应生命周期内，做对应的事情

### 编程题
  - 使用 Webpack 实现 Vue 项目打包任务
    - 具体任务及说明：
      - 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
      - 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
      - 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
      - 尽可能的使用上所有你了解到的功能和特性
