// 多个异步执行函数，生成器
function ajax(url) {
  return new Promise((resolve, reject) => {
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
}

// generate - utils:co
// function* main() {
//   const res1 = yield ajax('package.json');
//   console.log(res1);

//   const res2 = yield ajax('package1.json');
//   console.log(res2);
// }

// function co(generator) {
//   const g = generator();
//   function handleResult(result) {
//     if (result.done) return;
//     result.value.then(
//       (data) => {
//         generator(g.next(data));
//       },
//       (error) => {
//         g.throw(error);
//       }
//     );
//   }
//   handleResult(g.next());
// }

// async / await
async function main() {
  const res1 = await ajax('package.json');
  console.log(res1);

  const res2 = await ajax('package1.json');
  console.log(res2);
}

main();
