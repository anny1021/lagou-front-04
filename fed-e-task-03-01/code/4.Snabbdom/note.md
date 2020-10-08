### 目标

- 了解什么是 虚拟 dom, 以及虚拟 dom 的作用
  - 虚拟dom
    - 使用 js对象 描述 真实dom对象
    - 创建虚拟dom的对象比创建真实的dom的开销小很多
  - 为什么使用 虚拟 dom
    - 手动操作 dom 比较麻烦，需要考虑浏览器的兼容性
    - 简化 dom 的复杂操作，出现的 mvvm框架，mvvm 框架解决了视图和状态的同步问题
    - 虚拟 dom 的好处是当状态改变时，不需要立即更新dom,仅需要操作虚拟dom
  - 虚拟dom 的描述
    - 虚拟 dom 可以维护程序的状态，跟踪上一次的状态
    - 通过比较前后两次状态的差异更新真实 dom

  - 虚拟dom 的作用
    - 维护视图和状态的关系
    - 复杂视图情况下提升渲染性能
    - 除了渲染dom以外，还可以实现 ssr,原生应用，小程序等

  - 开源的 虚拟dom 库
    - Snabbdom - 官宣 最快的 虚拟dom 之一
    - virtual-dom
      - 使用 Snabbdom 改造而成的
- Snabbdom
  - 基本使用
  - 源码解析

- Snabbdom 常见问题
  - 引用
    - 官网推荐 commonjs 的方式引用
    - 我们使用 esmodule 的方式，根据新版本的依赖，引入方式更改为
    ```javascript
    // 根据当前的 Snabbdom 的版本
    import { init } from 'snabbdom/build/package/init';
    import { h } from 'snabbdom/build/package/h';
    // 将 Snabbdom 降级为 Snabbdom@v0.7.4
    ```


https://www.geekschool.org/2020/08/12/17948.html
