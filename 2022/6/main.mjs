/**
 * @param {string} s
 * @returns {number}
 */
export const main = (s, p2=false) => {
    if(p2) {
        for(let idx = 0; idx + 14 < s.length; idx++) {
            const part = s.slice(idx, idx + 14);
            const set = new Set(part.split(''));
            if(set.size == 14) {
                return idx + 14;
            }
        }
    }
    for(let idx = 0; idx + 4 < s.length; idx++) {
        const part = s.slice(idx, idx + 4);
        const set = new Set(part.split(''));
        if(set.size == 4) {
            return idx + 4;
        }
    }
}