/**
 * @template S
 * @callback predicateCallback
 * @param {S} value
 * @returns {boolean}
 */

/**
 * @template T, S
 * @param {Map<T, S>} map 
 * @param {predicateCallback<S>} predicate
 * @returns {Map<T, S>}
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
 * @template T, S
 * @param {Map<T, S>} map 
 * @param {predicateCallback<S>} predicate 
 * @returns
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
 * @template T, S
 * @param {Map<T, S>} map 
 * @param  {...T} keys 
 * @returns {(S | undefined)[]}
 */
export const getMany = (map, ...keys) => {
    let res = []
    for(let key of keys) {
        res.push(map.get(key))
    }
    return res;
}