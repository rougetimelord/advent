import { findLCM } from "./lcm.mjs";

/**
 * 
 * @param {string} s 
 */
export const process = (s) => {
    const dir = s.split("\n")[0], lines = s.split("\n").slice(2);
    let tree = {}, steps = 0, dirPos = 0;
    lines.forEach(v => {
        const matches = v.matchAll(/[A-Z]+/g),
        key = matches.next().value[0],
        arr = [matches.next().value[0], matches.next().value[0]];
        tree[key] = arr;
    })
    let curr = "AAA";
    const goal= "ZZZ";
    for (; 
        curr !== goal; 
        steps++,
        (dirPos < dir.length - 1) ? dirPos++ : dirPos = 0
    ) {
        curr = tree[curr][
            (dir[dirPos] == "L") ? 0 : 1
        ];
    }
    return steps
}

export const p2 = (s) => {
    const dir = s.split("\n")[0], lines = s.split("\n").slice(2);
    let tree = {};
    lines.forEach(v => {
        const matches = v.matchAll(/\w+/g),
        key = matches.next().value[0],
        arr = [matches.next().value[0], matches.next().value[0]];
        tree[key] = arr;
    });
    let curr = [...Object.keys(tree)].filter(v => v.endsWith("A"));
    let steps = curr.map(v => {
        let c = v, st = 0, dp = 0;
        console.log("map: ", c);
        while (!c.endsWith("Z")) {
            c = (dir[dp] === "L") ? tree[c][0] : tree[c][1];
            dp = (dp<dir.length-1)? dp + 1 : 0;
            st++;
        }
        console.log(st);
        //IM GOING TO FUCKING LOSE IT THIS SHIT ALMOST KILLED ME
        return st;
    }).sort((a, b) => a - b)
    return findLCM(steps);
}