/**
 * @param {Array[]} arrArr
 * @param {number} x
 */
export const column = (arrArr, x) => {
    return [...arrArr].map(v => v[x])
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
export const isTheSame = (arr) => {
    return arr.every((v, _, a) => v === a[0]);
}

/**
 * @typedef {Object<number, string[]>} OccurrenceGraph
 * 
 * @param {Array<any>} arr
 * @param {any|undefined} ignore
 * @returns {OccurrenceGraph}
 */
export const occurrences = (arr, ignore=undefined) => {
    /**@type {OccurrenceGraph} */
    let obj = {}, set = new Set(arr);
    if(ignore !== undefined) {set.delete(ignore)};
    for (let sym of set) {
        let x = arr.filter(v => v == sym).length;
        if (!obj?.[x]) {obj[x] = []}
        obj[x].push(sym);
    }
    return obj;
}

/**
 * @param {Array} arr 
 * @param {string} symbol A symbol that means empty in context
 */
export const isEmpty = (arr, symbol) => {
    return arr[0] == symbol && isTheSame(arr)
}