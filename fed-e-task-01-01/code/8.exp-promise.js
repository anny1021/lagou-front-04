const MyPromise = require('./code-代码题-四');

const promise1 = new MyPromise((reslove, reject) => {
  reslove('promise1');
});

const promise2 = new MyPromise((reslove, reject) => {
  reslove('promise2');
  //   reject('promise2');
});

// promise1.then((res) => {
//   console.log(11, res);
// });

// promise2.then(
//   (res) => {},
//   (res) => {
//     console.log(22, res);
//   }
// );

MyPromise.all(['a', promise1, 'hulala', promise2]).then((res) => {
  console.log(res);
});
