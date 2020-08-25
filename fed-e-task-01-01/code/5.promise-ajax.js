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

ajax('./package.json').then(
  (res) => {
    console.log(res);
  },
  (error) => {
    console.log(error);
  }
);
