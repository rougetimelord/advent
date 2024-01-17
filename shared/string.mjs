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

/**
 * @param {string} s 
 * @returns 
 */
export const splitEmptyLines = (s) => s.split(/\r?\n\r?\n/)

/**
 * @param {string} s 
 * @returns 
 */
export const splitInHalf = (s) => [s.slice(0, s.length / 2), s.slice(s.length / 2)]

/**
 * @param  {...string} s 
 * @returns 
 */
export const findCommon = (...s) => {
    const hits = new Map(s[0].split("").map(v => [v, 1]));
    s.slice(1).forEach(str => {
        for (const hit of hits.keys()) {
            if(!str.includes(hit)) {
                hits.delete(hit);
            }
        }
    })
    return Array.from(hits.keys());
}

/**
 * @param {string} s
 * @returns
 */
export const priority = (s) => {
    const code = s.charCodeAt(0);
    return (code > 96) ? code - 96 : code - 38;
}