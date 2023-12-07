import { cal } from "./data.mjs";

const numbers = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9}
let sum = cal.map(
    value => 
        parseInt([...value.matchAll(/(?=(one))|(?=(two))|(?=(three))|(?=(four))|(?=(five))|(?=(six))|(?=(seven))|(?=(eight))|(?=(nine))|[0-9]/g)]
            .map(
                v => numbers[
                    v.find(e => !!e)
                ] ||
                parseInt(v[0]))
            .filter(
                (_, i, a) =>
                i == 0 ||
                i == a.length - 1)
            .join(""))
)
.map( v => (v < 10) ? v * 10 + v : v)
.reduce((acc, v) => acc + v, 0)
console.log(sum)