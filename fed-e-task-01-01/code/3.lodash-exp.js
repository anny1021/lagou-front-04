const _ = require('lodash');

// const arr = [1, 2, 3, 4, 5, 6];

// forEach
// _.forEach(arr, (v) => {
//   console.log(v);
// });

// memoize
const moreThanNumber = (number) => (age) => {
  if (!(age > number)) {
    return console.log(`limit-number: ${number}; age: ${age}`);
  }
};

// const memoMoreThanNumber = _.memoize(moreThanNumber);
// const moreThanNumber18 = memoMoreThanNumber(18);
// const moreThanNumber28 = memoMoreThanNumber(28);
// moreThanNumber18(12);
// moreThanNumber28(14);

const memoize = (fn) => {
  const cache = {};
  return function () {
    try {
      const key = JSON.stringify(arguments);
      cache[key] = cache[key] || fn.apply(fn, arguments);
      return cache[key];
    } catch (e) {
      // 无需处理
    }
  };
};

// const memoMoreThanNumber = memoize(moreThanNumber);
// const moreThanNumber18 = memoMoreThanNumber(18);
// const moreThanNumber28 = memoMoreThanNumber(28);
// moreThanNumber18(12);
// moreThanNumber28(14);

// curry

// const getPow = (number, pow) => Math.pow(number, pow);
// const curriedGetPow = _.curry(getPow);

// console.log(curriedGetPow(2)(4));
// console.log(curriedGetPow(2, 4));

// curry - hasSpace

// const reg = _.curry((reg, str) => str.match(reg));
// const haveSpace = reg(/\s+/g);
// const curriedFilter = _.curry((fn, arr) => arr.filter(fn));

// console.log(curriedFilter(haveSpace, ['a ', 'b', 'c']));

// flowRight
const compose = (...args) => (value) =>
  args.reverse().reduce((accept, fn) => fn(accept), value);
const flowRightArr = [2, 4, 5, 'aa'];
// const flowFn = _.flowRight(_.toUpper, _.first, _.reverse);
const flowFn = compose(_.toUpper, _.first, _.reverse);
console.log(flowFn(flowRightArr));
