import { main } from "./main.mjs";

const data = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

const ans = 136;

let r = main(data);
console.assert(r==ans)
console.log(`Got ${r}`);