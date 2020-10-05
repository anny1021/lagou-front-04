class Observer {
  constructor(data) {
    this.walk(data);
  }
  // 遍历对象的所有属性
  walk(data) {
    // 1. data 值为空，非对象，空对象
    if (!data) {
      return;
    }
    if (Object.prototype.toString.call(data).toLowerCase() !== '[object object]') {
      return;
    }
    const dateKeys = Object.keys(data);
    if (!dateKeys.length) {
      return;
    }
    // 2. 遍历data 属性，调用 defineReactive
    dateKeys.forEach(key => {
      this.defineReactive(data, key, data[key]);
    });
  }
  // 调用 Object.defineProperty 将属性，转为 getter setter
  defineReactive(data, key, value) {
    const _this = this;
    // 为每一个 对象创建 dep 对象
    const dep = new Dep();
    this.walk(value); // [解决] data 内的值是否为 引用值
    Object.defineProperty(data, key, {
      enumerable: true, // 可枚举
      configurable: true, // 可操作
      get() {
        /*
          - value 而不是 data[key] 的原因
          - data[key] 会 触发 get 触发递归
          - 使用必包 扩展了 value 的作用域
        */
        // 收集依赖 target
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set(newVal) {
        if (newVal === value) {
          return;
        }
        value = newVal;
        _this.walk(newVal); // [解决] 新赋值的 双向绑定
        // 更新值的时候，发送通知 调用观察者
        dep.notify();
      }
    });
  }
}
