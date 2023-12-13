/**
 * @param {Array[]} arrArr
 * @param {number} i
 */
const column = (arrArr, i) => {
    return [...arrArr].map(v => v[i])
}

/**
 * @param {Array[]} arrArr
 * @returns {Array[]}
 */
export const rotate = (arrArr) => {
    let res = [];
    for(let i of arrArr[0].keys()){
        res.push(column(arrArr, i));
    }
    return res;
}

/**
 * @param {Array} arr 
 */
const isTheSame = (arr) => {
    return arr.every((v, _, a) => v === a[0]);
}

/**
 * @param {Array} arr 
 * @param {string} symbol
 */
export const isEmpty = (arr, symbol) => {
    return arr[0] == symbol && isTheSame(arr)
}