import { isFullyContained, overlaps } from "../../shared/range.mjs";
import { str2Lines } from "../../shared/string.mjs"

/**
 * @param {string} s
 * @returns {number}
 */
export const main = (s) => {
    return str2Lines(s)
        .map(l => l.split(",")
        .map(v2 => v2.split("-").map(v3 => parseInt(v3))))
        .reduce((p, c) => 
            p + overlaps(c[0], c[1]), 0);
}