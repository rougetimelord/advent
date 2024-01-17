/**
 * @param {String} s 
 * @returns {String[]}
 */
export const str2Lines = (s) => s.split(/\r?\n/)

/**
 * @param {string} s 
 * @returns String stripped of all whitespace
 */
export const stripWhiteSpace = (s) => s.replace(/\s/g, "")

export const splitEmptyLines = (s) => s.split(/\r?\n\r?\n/)