### 笔记

- [vue 的响应式原理](https://github.com/anny1021/lagou-front-04/blob/master/fed-e-task-03-01/code/2.basic-vue/note.md)

### 简答题答案以及说明

#### 当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。

- 不是
```javascript
// 方法一
Vue.set(vm.dog, 'name', 'Trump');
// 方法二
clickHandler () {
  this.dog = Object.assign({}, this.dog, { name: 'Trump' })
}
```
- vue2.0版本，追踪响应式的变化为 Object.defineProperty 
- 但是对于对象，数组的地址内容变动，是不能准确的监测到的
- 若是想要对象，数组与普通的变量值一样监听更新数值，需要采用 以上的两种变量更新方式

#### 请简述 Diff 算法的执行过程
- 两个相同的组件产生类似的DOM结构，不同的组件产生不同的DOM结构
- 同一层级的一组节点，他们可以通过唯一的id（key）进行区分。
- 当页面的数据发上变化的时候，Diff算法只会比较同一层级的节点：
- 如果节点类型不同，删除前面的节点，在创建并插入新的节点，不会再比较这个节点以后的子节点了。
- 如果节点类型相同，则会重新设置节点的属性，从而实现节点的更新。
- 当某一层有很多相同的节点时，也就是列表节点时，Diff算法的更新过程默认情况下也是遵循以上的原则。
- 在diff算法执行的过程中，id的作用就是为了高效更新虚拟DOM。另外vue中在使用相同标签名元素的过度切换时，也会使用到id属性，其目的也是为了让vue可以区分他们，否则vue只会替换其内部属性而不触发过渡效果。
- 所以官网不推荐我们使用 循环中的 index 作为一个元素的唯一 id 值。

### 编程题

#### 模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。

- 代码路径 [VueRouter 的 hash 模式的实现](https://github.com/anny1021/lagou-front-04/blob/master/fed-e-task-03-01/code/1.self-vue-router)

### 在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令
- 代码路径 [v-html 以及 v-on 指令](https://github.com/anny1021/lagou-front-04/blob/master/fed-e-task-03-01/code/3.mini-vue)

### 参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果，如图：
- 代码路径 [Snabbdom demo](https://github.com/anny1021/lagou-front-04/blob/master/fed-e-task-03-01/code/4.Snabbdom)
