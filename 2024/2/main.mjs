import { str2Lines } from "../../shared/string.mjs"

/**
 * @param {string} s
 * @param {boolean} p2
 * @returns {number}
 */
export const main = (s, p2 = false) => {
    // Each line has to be monotonic
    // and have a difference between elements of <= 3
    const lines = str2Lines(s).map(v => v.split(' ').map(Number));
    if(!p2) {
        return linesSafe(lines);
    }

    let sum = 0;
    for (const line of lines) {
        const allRemovals = line.map((v, i, a) => a.toSpliced(i, 1))
        const numSafe = linesSafe(allRemovals);
        if (numSafe > 0) {
            sum++;
        }
    }
    return sum
}

const linesSafe = (lines) => {
    let sum = 0;
    for (const line of lines) {
        /**
         * @type {boolean | undefined}
         */
        let asc, suc = true;
        for (let i = 1; i < line.length; i++) {
            let diff = line[i] - line[i - 1];
            if (asc == undefined) {
                asc = diff > 0;
            }
            else if (asc && diff <= 0) {
                suc = false;
                break;
            }
            else if (asc == false && diff >= 0) {
                suc = false;
                break;
            }

            if (Math.abs(diff) > 3 || diff == 0) {
                suc = false;
                break;
            }
        }
        if (suc) {
            sum++;
        }
    }
    return sum;
}