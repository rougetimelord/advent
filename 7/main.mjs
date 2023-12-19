import {occurrences } from "../shared/array.mjs";

const faceMap = new Map([
    ["T", 10],
    ["J", 11],
    ["Q", 12],
    ["K", 13],
    ["A", 14]
]);
const typeMap = new Map([
    [0, "One High"],
    [1, "One Pair"],
    [2, "Two pair"],
    [3, "3oK"],
    [4, "Full House"],
    [5, "4oK"],
    [6, "5oK"]
])

/**
 * @typedef Hand
 * @property {string[]} hand
 * @property {number} bet
 * @property {number} type
 */
/**
 * @param {string} s
 * @param {boolean} p2
 * @returns {number}
 */
export const main = (s, p2) => {
    /** @type {Hand[]} */
    const hands = s.split("\n")
    .map(v => {
        const tmp = v.split(" "), tmph = tmp[0].split("")
            .map(
                w => {
                    let r = faceMap.get(w) || Number(w);
                    if(p2 && r==11) {r=1};
                    return r;
                });
        let obj = {
            "hand": tmph,
            "bet": Number(tmp[1]),
            "type": type(tmph, p2)
        }
        return obj
    });
    hands.sort((a, b) => {
        if (a.type !== b.type) return a.type - b.type;
        for (let [i, v] of a.hand.entries()) {
            if(v !== b.hand[i]) return v - b.hand[i];
        }
        return 0
    });
    hands.forEach((v, i) => console.log(`${(i+1) * v.bet} [${v.hand}] ${typeMap.get(v.type)}`))
    return hands.reduce((p, c, i) => p += c.bet * (i + 1), 0)
}

/**
 * @param {number[]} h
 * @param {boolean} l
 * @returns 
 */
const type = (h, l) => {
    let res = 0;
    let oG = occurrences(h, 1);
    if (l && h.indexOf(1) !== -1 && Object.keys(oG).length != 0) {
        let m = Math.max(...Object.keys(oG));
        let n = oG[m].filter(v => v!==1)[0], k = [...h].map((v) => (v == 1) ? n : v);
        oG = occurrences(k, 1);
    }
    if (oG[5] || Object.keys(oG).length == 0) { res = 6}
    else if (oG[4]) { res = 5}
    else if (oG[3] && oG[2]) { res = 4}
    else if (oG[3]) { res = 3}
    else if (oG?.[2]?.length >= 2) { res = 2}
    else if (oG[2]) { res = 1}
    return res
}