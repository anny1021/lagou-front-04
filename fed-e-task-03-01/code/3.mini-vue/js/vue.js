
class Vue {
  constructor(options) {
    // 设置属性
    // 1. 通过属性保存选项的数据
    this.$options = options || {};
    this.$data = options.data || {};
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
    // 2. data 成员 转换为 getter setter,注入实例
    this._proxyData(this.$data);
    // 3. 调用 observer 对象，监听数据的变化
    new Observer(this.$data);
    // 4. 调用 compiler 对象，解析 指令 和差值表达式 
    new Compiler(this);
  }
  _proxyData(data) {
    // 遍历 data 的属性
    const dataKeys = Object.keys(data);
    if (!dataKeys.length) {
      return;
    }
    dataKeys.forEach(key => {
      // 注入实例
      Object.defineProperty(this, key, {
        enumerable: true, // 可枚举
        configurable: true, // 可操作
        get() {
          return data[key];
        },
        set(newVal) {
          if (newVal === data[key]) {
            return;
          }
          data[key] = newVal;
        }
      });
    });
  }
}
