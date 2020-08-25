// promise

const basePromise = new Promise((reslove, reject) => {
  reslove(100);
  // reject(new Error('promise rejected'))
});

basePromise.then(
  (res) => {
    console.log('onReslove', res);
  },
  (error) => {
    console.log('onReject', error);
  }
);

console.log('curret line');
