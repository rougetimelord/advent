import { splitEmptyLines, str2Lines } from "../../shared/string.mjs"

/**
 * @param {string} s
 * @returns {number}
 */
export const main = (s) => {
    /** @type {Number[]} */
    const a = splitEmptyLines(s)
        .map(
            d => str2Lines(d)
                .reduce(
                    (p, c) => p+ Number(c), 0
                )
        )
        .sort((a, b) => b - a)
    return [a[0], a.slice(0, 3).reduce((p, v) => p + v, 0)]
}