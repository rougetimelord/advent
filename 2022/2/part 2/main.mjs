import { str2Lines } from "../../../shared/string.mjs"

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
const outcome = new Map([
    [1, "lose"],
    [2, "draw"],
    [3, "win"]
]);
const wins = new Map([
    [1, 2],
    [2, 3],
    [3, 1]
]);
const loses = new Map([
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
            console.log(`Opponent ${desc.get(c[0])} need to ${outcome.get(c[1])}`)
            if (c[1] == 2) {
                console.log(`Picked ${desc.get(c[0])}`);
                return p + 3 + c[0];
            }
            if (c[1] == 1) {
                console.log(`Picked ${desc.get(loses.get(c[0]))}`);
                return p + loses.get(c[0]);
            }
            if (c[1] == 3) {
                console.log(`Picked ${desc.get(wins.get(c[0]))}`);
                return p + 6 + wins.get(c[0]);
            }
        }, 0);
}