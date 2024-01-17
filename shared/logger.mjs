/**
 * @template T
 * @param {T} r 
 * @param {T | undefined} a 
 * @param {string} m
 */
export const log = (r, a=undefined, m=`Got: ${r}`) => {
    if (a != undefined) {
        console.assert(r == a);
    }
    console.log(m);
}