import { part1, part2 } from "./1.mjs"

const data = `Time:      7  15   30
Distance:  9  40  200`

let res = part1(data);
console.assert(288 == res, "res: ", res)

let res2 = part2(data)
console.assert((res2 == 71503), res2)