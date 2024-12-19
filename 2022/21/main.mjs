import { str2Lines } from "../../shared/string.mjs"

const operands = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b
}

/**
 * @param {string} s
 * @returns {number}
 */
export const main = (s) => {
    const lines = str2Lines(s);
}