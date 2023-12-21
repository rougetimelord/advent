/**
 * 
 * @param {Map<T, T>} map 
 * @param {predicate} predicate 
 * @returns {Map<T, T>}
 */
export const filter = (map, predicate) => {
    let result = new Map();
    for (let [k, v] of map.entries()) {
        if (predicate(v)) {
            result.set(k, v);
        }
    }
    return result;
}

/**
 * @callback predicate
 * @param {U} value
 * @returns {boolean}
 */

/**
 * 
 * @param {Map<T, U>} map 
 * @param {predicate} predicate 
 * @returns {boolean}
 */
export const any = (map, predicate) => {
    for (let v of map.values()) {
        if (predicate(v)) {
            return true
        }
    }
    return false;
}

/**
 * 
 * @param {Map<T,U>} map 
 * @param  {...T} keys 
 * @returns {T[]}
 */
export const getMany = (map, ...keys) => {
    let res = []
    for(let key of keys) {
        res.push(map.get(key))
    }
    return res;
}