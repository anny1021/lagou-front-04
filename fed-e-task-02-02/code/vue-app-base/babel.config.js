module.exports = {
  presets: [
    // [
    //   "@babel/preset-env",
    //   {
    //     "targets": {
    //       // 此处为浏览器的查询条件
    //       // 1%：基于全球使用率统计而选择的浏览器版本范围
    //       // last 2 version：每个浏览器的最近两个版本
    //       // not ie <= 8：不小于等于ie8的浏览器版本
    //       "browsers": ["> 1%", "last 2 version", "not ie <= 8"]
    //     }
    //   }
    // ],
    "@babel/preset-env",
    // '@vue/cli-plugin-babel/preset'
  ],
  plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-syntax-dynamic-import"]
};
