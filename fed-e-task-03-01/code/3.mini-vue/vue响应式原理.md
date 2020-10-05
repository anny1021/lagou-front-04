### vue响应式原理

- 模拟 vue 的响应式原理
  - 梳理
    - vue 的基本结构
      ```javascript
      // v-text
      // v-model
      // 实例化
      let vm = new Vue({
        el:'#app',
        data(){
          return {
            msg:'msg',
            count: 1
          }
        }
      })
      ```
    - 打印 vue  的实例观察
      - count -》 get ,set
      - msg -> get, set
      - $data -> _data[私有成员]
      - $options
      - $el -》 选择器 || dom 对象
    - 整体结构
      - Vue
      - Observer 数据劫持
      - Compiler 解析指令
      - Watcher 观察者
      - Dep 发布者
  
- 整体流程
  - Vue
  - Observer 数据劫持
  - Dep 发布者
  - Watcher 观察者
  - Compiler 解析指令
    - 更新值的时候
    - 订阅数据变化
    - 绑定更新函数
