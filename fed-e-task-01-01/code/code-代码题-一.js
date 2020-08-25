// 代码题

// 一、使用 promise 改进代码

const a = 'hello';
const b = 'lagou';
const c = 'I 💗 U';

// 1
const aPromise = new Promise((reslove, reject) => {
  reslove(a);
});
const bPromise = new Promise((reslove, reject) => {
  reslove(b);
});
const cPromise = new Promise((reslove, reject) => {
  reslove(c);
});

Promise.all([aPromise, bPromise, cPromise], (res) => res).then((res) =>
  console.log(res.join(' '))
);

// 2
new Promise((reslove, reject) => {
  reslove(a);
})
  .then((res) => {
    return `${res} ${b}`;
  })
  .then((res) => {
    return `${res} ${c}`;
  })
  .then((res) => {
    console.log(res);
  });
