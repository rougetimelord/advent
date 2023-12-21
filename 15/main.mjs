/**
 * This was fun :)
*/

/**
 * @param {string} s
 * @returns {number}
 */
export const main = (s, p2) => {
    if (!p2) {
        return s.replace(/\s/g, "").split(",").map(v => hash(v)).reduce((p, c) => p + c, 0);
    }
    const map = hashmap(s.replace(/\s/g, ""));
    return mapSum(map)
}

/**
 * @param {string} s 
 * @returns 
 */
const hashmap = (s) => {
    /** @type {Map<number, Map<string, number>>} */
    const map = new Map([...Array(256).keys()].map(v => [v, new Map()]));
    const dat = s.split(",");
    for(let v of dat) {
        const label = v.split(/[\-=]/g)[0],
        box = hash(label),
        op = (v.includes("-")) ? "-" : "=";
        if(op == "-") {
            map.get(box).delete(label);
        } else {
            map.get(box).set(label, Number(v.split("").at(-1)));
        }
    }
    return map;
}

/**
 * 
 * @param {Map<number, Map<string, number>>} map 
 * @returns 
 */
const mapSum = (map) => {
    let sum = 0;
    for (let [k, v] of map.entries()) {
        if(v.size == 0) {continue};
        for (let l = [...v.values()], i = 0; i < l.length; i++) {
            sum += (k + 1) * (i + 1) * l[i];
        }
    }
    return sum;
}

/**
 * @param {string} s
 * @returns {number} 
 */
const hash = (s) => {
    return s.split("").reduce((p, c) => ((p + c.charCodeAt(0)) * 17) % 256, 0)
}