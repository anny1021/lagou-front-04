class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key; // data 中的属性名称
    this.cb = cb; // 回调函数，负责更新视图

    // 1. 把当前的 watcher 对象，记录在 dep 的静态 target
    Dep.target = this;
    // 2. 触发get方法，在get 方法中调用 addSub
    this.oldValue = vm[key];
    // 3. 防止重复添加
    Dep.target = null;
  }
  // 数据变更时，更新视图
  update() {
    let newVal = this.vm[this.key];
    if (this.oldValue === newVal) {
      return;
    }
    this.cb(newVal);
  }
}
