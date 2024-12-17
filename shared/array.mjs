/**
 * @template T
 * @param {T[][]} arrArr
 * @param {number} x
 */
export const column = (arrArr, x) => {
    return [...arrArr].map(v => v[x]);
}

/**
 * @template T
 * @param {T[][]} arrArr 
 * @param {number} y 
 * @returns 
 */
export const row = (arrArr, y) => {
    return [...rotate(arrArr)].map(v => v[y]);
}

/**
 * @template T
 * @param {T[][]} arrArr
 * @returns {T[][]} Input rotated
 */
export const rotate = (arrArr) => {
    let res = [];
    for(let i of arrArr[0].keys()){
        res.push(column(arrArr, i));
    }
    return res;
}

/**
 * @template T
 * @param {T[]} arr 
 */
export const isTheSame = (arr) => {
    return arr.every((v, _, a) => v === a[0]);
}

/**
 * @template T
 * @typedef {Object<number, T[]>} OccurrenceGraph
 */
/**
 * @template T
 * @param {T[]} arr
 * @param {T|undefined} ignore
 * @returns {OccurrenceGraph<T>}
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
 * @template T
 * @param {T[]} arr 
 * @param {T} symbol A symbol that means empty in context
 */
export const isEmpty = (arr, symbol) => {
    return arr[0] == symbol && isTheSame(arr)
}

/**
 * @template T
 * @param {T[]} arr 
 * @returns {T[][]}
 */
export const noOverlapPairs = (arr) => {
    let res = [];
    for (let i = 0; i < arr.length / 2; i++) {
        res.push([arr[2 * i], arr[2 * i + 1]]);
    }
    return res;
}

export const createRangeArray = (start, length) => 
    [...Array(length).keys()].map(v  => start + v)

/**
 * @template T
 * @param {T[][]} array 
 * @param {Number[]} index 
 * @returns {Array.<{val: T, dir: [number, number]}>}
 */
export const getAdjacentValues = (array, index) => {
    const y = index[0];
    const x = index[1];
    const left = x - 1 >= 0, right = x + 1 < array[y].length, up = y - 1 >= 0, down = y + 1 < array.length;
    let result = [];
    // up, up right, right, down right, down, down left, left, up left
    if (up) {
        result.push({val: array[y-1][x],dir: [-1, 0]});
    }
    if (up && right) {
        result.push({val: array[y-1][x+1], dir: [-1, 1]});
    }
    if (right) {
        result.push({val: array[y][x+1], dir: [0, 1]});
    }
    if (down && right) {
        result.push({val: array[y+1][x+1], dir: [1, 1]});
    }
    if (down) {
        result.push({val: array[y+1][x], dir: [1, 0]});
    }
    if (down && left) {
        result.push({val: array[y+1][x-1], dir: [1, -1]});
    }
    if (left) {
        result.push({val: array[y][x-1], dir: [0, -1]});
    }
    if (up && left) {
        result.push({val: array[y-1][x-1], dir: [-1, -1]});
    }

    return result;
}

/**
 * 
 * @param {number[]} a 
 * @param {number[]} b 
 * @returns {number[]}
 */
export const addArrays = (a, b) => {
    if (a.length !== b.length) {
        throw new Error('can only add arrays of the same length');
    }
    let result = []
    for (let i = 0; i < a.length && i < b.length; i++) {
        result.push(a[i] + b[i]);
    }
    return result
}