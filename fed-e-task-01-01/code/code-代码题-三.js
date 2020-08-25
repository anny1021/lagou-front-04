// 代码题

// 三，基于下面的代码，完成后续的四个练习
const fp = require('lodash/fp');
const { Maybe, Container } = require('./support');
const { parseInt } = require('lodash');

// 练习 1: 实现 ex1
let maybe = Maybe.of([5, 6, 1]);

let ex1 = fp.curry((value, number) =>
  fp.map((v) => fp.add(v, number), value._value)
);
Container.of(maybe)
  .map((v) => ex1(v, 2))
  .map((res) => {
    console.log(res);
  });

//  练习 2: 实现 ex2
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);
let ex2 = (value) => fp.first(value);
xs.map((res) => ex2(res)).map((res) => {
  console.log(res);
});

//  练习 3: 实现 ex3
let user = { id: 2, name: 'Albert' };
let safeProp = fp.curry((x, o) => Maybe.of(o[x]));
let ex3 = (res) => fp.flowRight(fp.first, fp.split(''))(res);

Container.of(user)
  .map((res) => safeProp('name', user))
  .map((res) => ex3(res._value))
  .map((res) => {
    console.log(res);
  });

//  练习 4: 重写 ex4, 不要有 if 语句
let ex4 = (n) => Maybe.of(n);
