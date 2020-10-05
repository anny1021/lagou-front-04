class Dep {
  constructor() {
    // 存储所有的观察者
    this.subs = [];
  }
  // 添加观察者
  addSub(sub) {
    if (!sub) {
      return;
    }
    if (!sub.update) {
      return;
    }
    this.subs.push(sub);
  }
  // 发送通知
  notify() {
    if (!this.subs.length) {
      return;
    }
    this.subs.forEach(sub => {
      sub.update && sub.update();
    });
  }
}
