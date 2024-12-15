import { str2Lines } from "../../shared/string.mjs"

/**
 * @param {string} s
 * @param {?boolean} p2
 * @returns {number}
 */
export const main = (s, p2 = false) => {
    const lines = str2Lines(s);
    let left = [], right = [];
    for (const line of lines) {
        const entries = line.split('   ');
        left.push(Number(entries[0]));
        right.push(Number(entries[1]));
    }
    left.sort((a,b) => a - b);
    right.sort((a, b) => a - b);

    if (p2) {
        return part2(left, right);
    }

    let sum = 0;
    for (let i = 0; i < left.length; i++) {
        sum += Math.abs(left[i] - right[i]);
    }

    return sum;
}

/**
 * @param {number[]} left 
 * @param {number[]} right
 * @returns {number}
 */
const part2 = (left, right) => {
    let sum = 0;
    for (const num of new Set(left)) {
        const leftN = left.filter(v => v == num).length;
        const rightN = right.filter(v => v == num).length;
        sum += leftN * num * rightN;
    }
    return sum;
}