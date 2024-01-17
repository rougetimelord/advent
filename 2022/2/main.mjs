import { str2Lines } from "../../shared/string.mjs"

const scores = new Map([
    ["X", 1],
    ["Y", 2],
    ["Z", 3],
    ["A", 1],
    ["B", 2],
    ["C", 3]
]);
const desc = new Map([
    [1, "rock"],
    [2, "paper"],
    [3, "scissors"]
]);
const wins = new Map([
    [1, 3],
    [2, 1],
    [3, 2]
]);

/**
 * @param {string} s
 * @returns {number}
 */
export const main = (s) => {
    return str2Lines(s)
        .map(d => d.split(" ")
            .map(v => scores.get(v))
        )
        .reduce((p, c) => {
            console.log(`Playing ${desc.get(c[1])} against ${desc.get(c[0])}`)
            if(c[0] == c[1]) {
                console.log("Draw");
                return p + 3 + c[1];
            }
            if (wins.get(c[1]) == c[0]) {
                console.log("Won");
                return p + 6 + c[1];
            }
            console.log("Lost");
            return p + c[1]
        }, 0)
}