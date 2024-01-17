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
    const searches = Array.from(new Set(s[0].split("")));
    return searches.reduce((p, v) => {
        if (s[1].includes(v)) p.push(v);
        return p;
    }, [])
}

/**
 * @param {string} s
 * @returns
 */
export const priority = (s) => {
    const code = s.charCodeAt(0);
    return (code > 96) ? code - 96 : code - 38;
}