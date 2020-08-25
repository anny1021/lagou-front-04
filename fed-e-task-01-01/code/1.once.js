// once
// function once (){
//     let flag = true;
//     return function(value){
//         if(flag){
//             flag = false;
//             console.log(`值: ${value}`);
//         }
//     }
// }

// const r = once();
// r('1 rmb');

// once
function once(fn) {
  let flag = true;
  return function () {
    if (flag) {
      flag = false;
      return fn.apply(fn, arguments);
    }
  };
}

const pay = once((money) => {
  console.log(`支付了 ${money} rmb`);
});

pay(3);
pay(3);
pay(3);
