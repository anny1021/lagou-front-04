// 官网导出示例 - commonjs
// var snabbdom = require('snabbdom')
// 导入 - esmodule
import { init } from 'snabbdom/build/package/init.js';
import { h } from 'snabbdom/build/package/h.js';
/*
* snabbdom 导出元素
* - init 高阶函数，返回 patch
* - h 返回虚拟节点 VNode
* - thunk 是一种优化策略，处理不可变数据时使用
*/

// 示例: 1. hello world
/*
* 参数： 数组，模块
* 返回值： patch 函数，对比两个 vnode 的差异更新到真实dom
*/
const patch = init([]);
/*
* h 函数
* 参数1: 便签+选择器
* 参数2: typeof === 'string'  => 标签中的内容
*/
const vnode = h('div#container.cls', 'hello world');
const app = document.querySelector('#app');
/*
* patch 函数
* 参数1: 可以为真实的 dom 元素，将 dom 转换为 vnode
* 参数2: vnode
* 返回值: vnode
*/
let oldVnode = patch(app, vnode);
vnode = h('div', 'hi~');
patch(oldVnode, vnode);
// console.log(oldVnode);

// 示例: 2. div中放置子元素 h1 p
// setTimeout(() => {
//   vnode = h('div#second', [h('h1', '基本使用2'), h('p', 'hello snabbdom')]);
//   // 把老的视图更新到新的状态
//   oldVnode = patch(oldVnode, vnode);

//   setTimeout(() => {
//     // 卸载DOM，文档中patch(oldVnode,null)有误
//     // h('!')创建注释
//     patch(oldVnode, h('!'));
//   }, 1000);
// }, 2000);

