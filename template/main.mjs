import { log } from "../../shared/logger.mjs";

/**
 * @param {string} s 
 * @param {number} ans1 
 * @param {number} ans2 
 */
export const main = (s, ans1, ans2) => {
    console.log('Part 1')
    let start = performance.now();
    const r1 = part1(s)
    console.log(`Time taken: ${performance.now()-start}`);
    if(ans1) {
        log(r1, ans1)
    }
    console.log('Part 2')
    start = performance.now();
    const r2 = part2(s)
    console.log(`Time taken: ${performance.now()-start}`);
    if(ans2) {
        log(r2, ans2)
    }
}

/**
 * 
 * @param {string} s
 * @returns {number} 
 */
const part1 = (s) => {

}

/**
 * 
 * @param {string} s
 * @returns {number} 
 */
const part2 = (s) => {

}