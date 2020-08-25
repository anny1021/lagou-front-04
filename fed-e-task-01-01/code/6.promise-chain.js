// promise ajax

const ajax = (url) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.reject));
      }
    };
    xhr.send();
  });

ajax('./package.json')
  .then((res) => {
    console.log(1111);
    return './package.json';
  })
  .then((res) => {
    console.log(2222, res);
    return ajax(res);
  })
  .then((res) => {
    console.log(3333, res);
  })
  .then((res) => {
    console.log(4444);
  });

console.log('aaaa');
