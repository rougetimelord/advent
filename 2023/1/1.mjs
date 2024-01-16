import { cal } from "./data.mjs"

let sum = 0;
cal.forEach(
    value => {
        let matches = [...value.matchAll(/[0-9]/g)];
        sum += parseInt(`${matches[0][0]}${matches.at(-1)[0]}`)
    }
)
console.log(sum)