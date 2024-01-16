import { main } from "./main.mjs"

const maze1 = `.....
.S-7.
.|.|.
.L-J.
.....`
const maze2 = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`

// let res = main(maze1);
// console.assert(res == 4);
// console.log("Got:", res);
let res=main(maze2);
console.assert(res == 8);
console.log("Got:", res);