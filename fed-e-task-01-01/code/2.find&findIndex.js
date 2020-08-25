// find
const find = (arr, fn) => {
  for (let value of arr) {
    if (fn(value)) {
      return [value];
    }
  }
  return null;
};

// const arr = [1, 1, 3, 1];
// const r = find(arr, (v) => !(v % 2));
// console.log(r);

// findIndex

const findIndex = (arr, fn) => {
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i])) {
      return i;
    }
  }
  return -1;
};

const arr1 = [1, 1, 3, 4];

const r1 = findIndex(arr1, (v) => !(v % 2));
console.log(r1);
