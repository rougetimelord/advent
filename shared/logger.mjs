/**
 * @param {any} r 
 * @param {any | undefined} a 
 * @param {string} m
 */
export const log = (r, a=undefined, m=`Got: ${r}`) => {
    if (a) {
        console.assert(r == a);
    }
    console.log(m);
}