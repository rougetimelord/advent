import { main } from "./main.mjs"

const data = 
`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`

let res = main(data, 1);
console.log(res)
console.log("Got:", res.reduce((a, c) => a + c))