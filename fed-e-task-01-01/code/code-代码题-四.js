// 代码题

// 四、手写 promise
/* 分析 promise
  状态
    - 三个：  pending - 等待, fulfilled 成功, rejected 失败
    - 状态变更
      - pending -> fulfilled
      - pending -> rejected
      - 状态一经变更，状态不可逆
  方法
    - 基本方法
      - resolve 成功的回调函数
        - 参数：数值 ｜ promise
      - reject 失败的回调函数
        - 参数：数值 ｜ promise
        - 需要抛出执行的错误
    - 工具方法
      - 公共属性
        - 满足 promise 的链式调用，需要返回 新的 promise【如果返回自己，将会报错-类型错误 TypeError】
      - then
        - 可选参数
          - successCallback:[fn]
          - failCallback:[fn]
      - finally
        - 无论当前 prmoise 执行成功，或者失败，都会执行
        - 所以，需要执行 resolve 返回执行结果, reject 返回错误信息
        - 链式调用，需要写在程序的最后面
      - catch
        - 捕获当前 promise 的错误
        - 使用 then，不传递 successCallback 方法，就是错误的调用
    - 静态的方法
      - reslove
        - 实例上，直接调用 resolve 方法
          - 需要判断参数值，还是 promise
      - all
        - 参数 (value || promise)[]
          - 需要判断参数值，还是 promise
  需要注意的地方
    - 捕捉 promise 的错误
      - 执行器执行时候的错误
      - resolve 传入 非 自己的 promise
    - all 方法，可能需要执行多个 resolve, resolve 的并发
      - 存储 successCallback，failCallback 设计为数组 
      - 计数器计数 执行的总数 与 当前执行的总数的关系
      - 已经执行的 callback, 需要从存储内 删除
    - setTimeout 0的使用
      - 当前同步任务执行完成后，最后触发当前 setTimeout, 保证回调执行完成
 */

const PENDING = 'pending'; // 等待
const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }
  // promsie 状态
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败后的原因
  reason = undefined;
  // 成功回调
  successCallback = [];
  // 失败回调
  failCallback = [];

  resolve = (value) => {
    if (this.status !== PENDING) return;
    this.status = FULFILLED;
    this.value = value;
    while (this.successCallback.length) this.successCallback.shift()();
  };
  reject = (reason) => {
    if (this.status !== PENDING) return;
    this.status = REJECTED;
    this.reason = reason;
    while (this.failCallback.length) this.failCallback.shift()();
    console.log(reason);
  };
  then(successCallback, failCallback) {
    successCallback = successCallback ? successCallback : (value) => value;
    failCallback = failCallback
      ? failCallback
      : (reason) => {
          throw reason;
        };
    let promsie2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = successCallback(this.value);
            resolvePromise(promsie2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason);
            resolvePromise(promsie2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      } else {
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.value);
              resolvePromise(promsie2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let x = failCallback(this.reason);
              resolvePromise(promsie2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });
    return promsie2;
  }
  finally(callback) {
    return this.then(
      (value) => {
        return MyPromise.resolve(callback()).then(() => value);
      },
      (reason) => {
        return MyPromise.resolve(callback()).then(() => {
          throw reason;
        });
      }
    );
  }
  catch(failCallback) {
    return this.then(undefined, failCallback);
  }
  static all(array) {
    let result = [];
    let index = 0;
    return new MyPromise((resolve, reject) => {
      function addData(key, value) {
        result[key] = value;
        index++;
        if (index === array.length) {
          resolve(result);
        }
      }
      for (let i = 0; i < array.length; i++) {
        let current = array[i];
        if (current instanceof MyPromise) {
          current.then(
            (value) => addData(i, value),
            (reason) => reject(reason)
          );
        } else {
          addData(i, array[i]);
        }
      }
    });
  }
  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve) => resolve(value));
  }
}

function resolvePromise(promsie2, x, resolve, reject) {
  if (promsie2 === x) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<Promise>')
    );
  }
  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}

module.exports = MyPromise;
