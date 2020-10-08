class Compiler {
  constructor(vm) {
    // dom 对象
    this.el = vm.$el;
    // vue 实例
    this.vm = vm;
    // 调用编译器
    this.compile(this.el);
  }
  // 编译器 - 遍历dom 对象，判断类型，并解析
  compile(el) {
    const childNodes = el.childNodes;
    const childNodesArr = Array.from(childNodes);
    if (!childNodesArr.length) {
      return;
    }
    childNodesArr.forEach(node => {
      if (!node) {
        return;
      }
      if (this.isTextNode(node)) {
        // 文本
        this.compileText(node);
      } else if (this.isElementNode(node)) {
        // 元素
        this.compileElement(node);
      }
      // node 节点 -》 子节点 -》 递归 compile
      if (node.childNodes && node.childNodes.length) {
        this.compile(node);
      }
    });
  }
  // 编译元素节点，处理指令
  compileElement(node) {
    // v-text
    // v-model
    // node.attributes
    // 1. 遍历所有的属性节点
    const attrArr = Array.from(node.attributes);
    if (!attrArr.length) {
      return;
    }
    attrArr.forEach(attr => {
      const attrName = attr.name;
      // 2. 判断是否是指令
      if (this.isDirective(attrName)) {
        // 3. 判断当前是什么指令
        // v-html => html
        const currentAttrName = attrName.substr(2);
        const attrVal = attr.value;
        this.update(node, attrVal, currentAttrName);
      } else if (this.isAliasDirective(attrName)) {
        // 指令别名 @
        this.update(node, attr.value, attrName);
      }
    });
  }
  // 处理指令的方法 - 根据指令的名称拼接
  update(node, key, attrName) {
    const ignoreFn = attrName.indexOf(':') !== -1 || attrName.indexOf('@') !== -1;
    if (!ignoreFn && attrName !== 'html') {
      const updateFn = this[`${attrName}Updater`];
      this.vm[key] && updateFn && updateFn.call(this, node, this.vm[key], key);
    } else if (attrName === 'html') {
      key && this.htmlUpdater.call(this, node, key);
    } else {
      this.eventUpdater(attrName, node, key);
    }
  }
  // v-text 方法
  textUpdater(node, val, key) {
    node.textContent = val;
    // 当数据改变时候，创建 watcher 对象，更新视图
    new Watcher(this.vm, key, (newVal) => {
      node.textContent = newVal;
    });
  }
  // v-model 方法
  modelUpdater(node, val, key) {
    node.value = val;
    // 当数据改变时候，创建 watcher 对象，更新视图
    new Watcher(this.vm, key, (newVal) => {
      node.value = newVal;
    });
    // 实现双向绑定
    node.addEventListener('input', () => {
      if (key && this.vm[key]) {
        this.vm[key] = node.value;
      }
    });
  }
  // v-html方法
  htmlUpdater(node, val) {
    if (val) {
      node.innerHTML = val;

      new Watcher(this.vm, key, newValue => {
        node.innerHTML = newValue;
      });
    }
  }
  // eventUpdater
  eventUpdater(attrName, node, val) {
    if (!val) {
      return;
    }
    const fn = eval(val);
    if (typeof fn !== 'function') {
      return;
    }
    let eventName = '';
    if (attrName.indexOf(':') !== -1) {
      eventName = attrName.split(':');
    } else if (attrName.indexOf('@') !== -1) {
      eventName = attrName.split('@');
    }
    if (!eventName[1] || !['click'].includes(eventName[1])) {
      return;
    }
    const eventType = eventName[1];
    const executeFn = () => { fn(); };
    node.addEventListener(eventType, executeFn);
    new Watcher(this.vm, key, newValue => {
      node.removeEventListener(eventType, fn);
      node.addEventListener(eventType, executeFn);
    });
  }
  // 编译文本，处理差值表达式
  compileText(node) {
    // console.dir 打印的内容以对象的方式打印
    // console.dir(node);
    // textContent 文本节点的内容
    // nodeType 3 文本节点的节点类型
    // 匹配差值表达式，并且提取
    const reg = /\{\{(.+)?}\}/;
    const val = node.textContent;
    if (reg.test(val)) {
      const key = RegExp.$1.trim();
      node.textContent = val.replace(reg, this.vm[key]);

      // 当数据改变时候，创建 watcher 对象，更新视图
      new Watcher(this.vm, key, (newVal) => {
        node.textContent = newVal;
      });
    }
  }
  // 是否是指令 v-
  isDirective(attrName) {
    return attrName.startsWith('v-');
  }
  isAliasDirective(attrName) {
    return attrName.startsWith('@');
  }
  // 是否是文本 nodeType 3
  isTextNode(node) {
    return node.nodeType === 3;
  }
  // 是否是元素节点 nodeType 1
  isElementNode(node) {
    return node.nodeType === 1;
  }
}
