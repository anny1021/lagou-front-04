### vue 的响应式原理

- 最小版本的 vue
- 响应式原理在面试的常见问题
- 学习别人优秀的经验，转换成自己的经验
- 实际项目中出问题的原理层面的解决
  - 给 vue 实例 新增一个成员是否是响应式的
  - 给 属性重新赋值成对象，是否是响应式的
- 为学习 vue 源码做铺垫

### 准备工作

- 数据驱动
  - 一个过程
  - 仅用关注数据本身，关注业务层
- 数据响应式
  - 数据模型
  - 数据改变 -》 数据自动更新 -》 避免 dom 操作
- 双向绑定
  - form 表单，可以与用户交互的元素

### 数据响应式的核心原理
- vue 2.x
  - Object.defineProperty
    - > 浏览器 IE8
  - 手写实现 监听模式 defineProperty
- vue 3.x
  - proxy
    - 监听对象，而非属性
    - ie 不支持

### 发布订阅模式 与 观察者模式

- 发布订阅模式
  - 订阅者
  - 发布者
  - 信号中心
  - 举例
    - vue 兄弟组件通信过程
      ```javascript
      // 事件中心 eventBus
      let  eventBus = new Vue()

      // 发布者 componentA
      addTodo: function () {
        // 发布消息
        eventBus.$emit('add-todo', { text: this.newTodoText });
        this.newTodoText = ''
      }
      // 订阅者 componentB
      created: function name(params) {
        // 订阅消息
        eventBus.$on('add-todo',this.addTodo)
      } 
      ```
    - vue 自定义事件的实践

- 观察者模式
  - 与 发布订阅模式的区别
    - 没有 事件中心
    - 事件中心的作用，隔离 发布者 和 订阅者，减少 这两者的依赖
  - 包含
    - 观察者 -》 订阅者
      update() 当事件发生时，具体要做的事情
    - 目标 -》 发布者
      data : 存储所有的观察者
      addData: 添加观察者
      notify(): 当事件发生，调用所有观察者的 update() 方法
- 总结
  - 观察者模式 是由 具体目标调度，观察者模式的订阅者与发布者之间的关系是直连的
  - 发布/订阅模式由统一调度中心调用，因此发布者和订阅者被隔离
