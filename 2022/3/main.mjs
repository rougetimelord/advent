import { findCommon, splitInHalf, str2Lines, priority } from "../../shared/string.mjs"

/**
 * @param {string} s
 * @returns {number}
 */
export const main = (s) => {
    return str2Lines(s)
        .map(line => splitInHalf(line))
        .reduce((p, c) => {
            return p + findCommon(...c)
                .reduce((pp, cc) => pp + priority(cc), 0)
        }, 0);
}

export const main2 = (s) => {
    const lines = str2Lines(s), triplets = [];
    for (let i = 0; i < lines.length; i += 3) {
        triplets.push([lines[i], lines[i+1], lines[i+2]])
    }
    return triplets.reduce((p, c) => {
        const badge = findCommon(...c);
        return p + priority(badge[0]);
    }, 0)
}