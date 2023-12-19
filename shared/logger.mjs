/**
 * @param {any} r 
 * @param {any | undefined} a 
 */
export const log = (r, a=undefined) => {
    if (a) {
        console.assert(r == a);
    }
    console.log(`Got: ${r}`);
}