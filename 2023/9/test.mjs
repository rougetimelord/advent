import { main } from "./1.mjs";

const data = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`

main(data).then(v => {
    console.assert(v[1] == 114);
    console.log("Got:", v)
});