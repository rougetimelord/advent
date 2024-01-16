import { p2, process } from "./1.mjs"

const data = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`

const result = process(data);
console.assert(result == 6)
console.log("got: ", result)

const part2 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)`
const part2r = p2(part2);
console.assert(part2r == 6);
console.log("got: ", part2r);
