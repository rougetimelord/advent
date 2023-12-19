/**
 * @param {any} r 
 * @param {any | undefined} a 
 * @param {string} m
 */
export const log = (r, m=`Got: ${r}`, a=undefined) => {
    if (a) {
        console.assert(r == a);
    }
    console.log(m);
}