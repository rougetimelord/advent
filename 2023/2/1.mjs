import { objBuilder } from "./objBuilder.mjs";
import { games as testGames } from "./test.mjs";
import { games } from "./data.mjs";

const rules = {"red": 12, "green": 13, "blue": 14};
const gamesO = objBuilder(games);
let sum = 0;

for(const [id, value] of Object.entries(gamesO)) {
    if(value.redM > rules.red ||
        value.greenM > rules.green ||
        value.blueM > rules.blue) {
            continue;
        }
    sum += Number(id);
}
console.log("Sum of possible games: ", sum)

let sum2 = 0;
for(const [id, value] of Object.entries(gamesO)) {
    sum2 += value.redM * value.greenM * value.blueM
}
console.log("Sum of powers: ", sum2)