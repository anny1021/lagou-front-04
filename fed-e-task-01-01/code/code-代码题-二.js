// 代码题

// 二、基于以下代码完成下面的四个联系
const fp = require('lodash/fp');

// 数据
// horsepower 马力，dollar_value 价格， in_stock 库存

const cars = [
  { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
  {
    name: 'Spyker C12 Zagato',
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false,
  },
  {
    name: 'Jaguar XKR-S',
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false,
  },
  {
    name: 'Audi R8',
    horsepower: 525,
    dollar_value: 114200,
    in_stock: false,
  },
  {
    name: 'Aston Martin One-77',
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true,
  },
  {
    name: 'Pagani Huayra',
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false,
  },
];

const trace = fp.curry((tag, v) => {
  console.log(tag, v);
  return v;
});

// 练习 1 - 获取最后一条数据的 in_stock
const findInstock = fp.curry((key, val) => {
  return fp.prop(key, val);
});

let isLastInStock = fp.flowRight(findInstock('in_stock'), fp.last);
let res1 = isLastInStock(cars);
console.log(res1);

// 练习 2 - 获取第一条数据的 name
let isFirstInStock = fp.flowRight(findInstock('name'), fp.first);
let res2 = isFirstInStock(cars);
console.log(res2);

// 练习 3 - 使用帮助函数 _average 重构 averageDollarValue
let __average = (xs) => fp.reduce(fp.add, 0, xs) / xs.length;

// let averageDollarValue = function (cars) {
//   let dollar_values = fp.map(function (car) {
//     return car.dollar_value;
//   }, cars);
//   console.log(dollar_values);
//   return __average(dollar_values);
// };

let getDollarValue = (data) => data.map((item) => item.dollar_value);
let averageDollarValue = fp.flowRight(__average, getDollarValue);
console.log(averageDollarValue(cars));

// 练习 4 - 使用 flowRight 写一个 sanitizeNames()
const nameData = ['Hello World'];
let _underscore = fp.replace(/\s+/g, '_');
let turnArray = (str) => [].concat([str]);
let sanitizeNames = fp.flowRight(turnArray, _underscore, fp.toLower);
console.log(sanitizeNames(nameData));
