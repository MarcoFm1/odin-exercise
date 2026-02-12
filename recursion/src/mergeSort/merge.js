export default function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = arr.length / 2;
    const left = arr.slice(0, mid);
    const right = arr.slice(mid, arr.length);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
   const mergedArr = [];
   while (left.length && right.length) {
      const smallest = left[0] < right[0] ? left.shift() : right.shift();
      mergedArr.push(smallest);
   }
   return [...mergedArr, ...left, ...right];
}