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
 * @param {string} s
 * @returns {number}
 */
const part1 = (s) => {
    let currentId = 0;
    let disk = [];
    let empties = []
    for (let i = 0; i < s.length; i++) {
        const currentBlocks = Number(s[i]);
        if (i % 2 == 0) {
            for (let i = 0; i < currentBlocks; i++) {
                disk.push(currentId);
            }
            currentId++;
        }
        else {
            let location = disk.length;
            for (let i = 0; i < currentBlocks; i++) {
                disk.push(-1);
                empties.push(location++);
            }
        }
    }

    for (let i = disk.length - 1; i > 0 && empties.length > 0; i--) {
        const char = disk[i];
        if (char == -1) {
            continue;
        }

        const nextEmpty = empties.shift();
        if (i < nextEmpty) {
            continue;
        }

        disk[nextEmpty] = disk[i];
        disk[i] = -1;
    }

    return disk.reduce((p, c, i) => {
        if (c == -1) {
            return p;
        }
        return p + c * i; 
    }, 0);
}

/**
 * 
 * @param {string} s
 * @returns {number} 
 */
const part2 = (s) => {

}