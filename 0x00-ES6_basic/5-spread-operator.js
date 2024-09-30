// let array1 = [2, 3];
// let array2 = [6, 8];
// let arr = [...array1, ...array2, ..."AA".split("")];
// console.log(arr);

// function concatArrays(array1, array2, string) {
    
// }
// console.log(concatArrays(['a', 'b'], ['c', 'd'], 'Hello'));

export default function concatArrays(array1, array2, string) {
    return [...array1, ...array2, ...string.split("")];
}
