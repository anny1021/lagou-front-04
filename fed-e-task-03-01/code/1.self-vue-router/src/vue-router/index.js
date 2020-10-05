/* eslint-disable */
let _Vue = null;

export default class VueRouter {
  constructor(options) {
    // options data routeMap
    this.options = options;
    this.routeMap = {};
    this.data = _Vue.observable({
      current: '/'
    });
  }
  // init options.route for routeMap
  createdRouterMap() {
    // 遍历所有的路由规则，将路由规则解析为 键值对的方式
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component;
    });
  }
  // init component : router link &&  router view
  initComponents(Vue) {
    // router link
    Vue.component('router-link', {
      props: {
        to: String
      },
      // template: '<a :href="to"><slot></slot></a>'
      render(h) { // h -> 创建虚拟 dom
        return h(
          'a', // 1.选择器
          {
            attrs: { // 2.dom 的属性
              href: this.to
            },
            // 添加事件
            on: {
              click: this.clickHandler
            }
          },
          [this.$slots.default]// 3. a 便签中间的内容 获取默认 的插槽
        );
      },
      methods: {
        // 客户端更改地址栏，不发送请求到 服务器
        clickHandler(e) {
          // 1. 改变地址栏
          history.pushState({}, '', this.to);
          // 2. 更新 data.current 
          this.$router.data.current = this.to;
          e.preventDefault();
        }
      }
    });
    // router view
    const _this = this;
    Vue.component('router-view', {
      render(h) {
        // 1. 当前路由的地址 路由地址对应的组件
        const component = _this.routeMap[_this.data.current];
        // 2. 渲染组件
        return h(component);
      }
    });
  }
  //  init 
  init() {
    this.createdRouterMap();
    this.initComponents(_Vue);
    this.initEvent();
  }
  // initEvent popstate
  initEvent() {
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname;
    });
  }
  static install(Vue) {
    // 1.判断当前插件是否安装
    if (VueRouter.install.installed) {
      return;
    }
    VueRouter.install.installed = true;
    // 2.将当前组件放在 vue 的构造函数当中，全局变量中
    _Vue = Vue;
    // 3.传入的 router 参数，注入到所有的 vue 实例上
    _Vue.mixin({
      beforeCreate() {
        if (!this.$options.router) {
          return;
        }
        _Vue.prototype.$router = this.$options.router;
        // 立即调用 初始化的方法
        this.$options.router.init();
      }
    });
  }
}
