import { combineMaps, produceRangeMap } from "../shared/map.mjs";
import { str2Lines } from "../shared/string.mjs"
/**
 * @param {string} s
 * @returns {number}
 */
export const main = (s) => {
    let ls = str2Lines(s), part = 0, seeds = [], map = new Map();
    ls.push("")
    for (let line of ls) {
        if (line == "") {
            part++;
            if (map.size == 0) {continue}
            let n = []
            for (let seed of seeds) {
                let p = seed
                for (let [k, v] of map.entries()) {
                    if (seed >= k[0] && seed <= k[1]) {
                        p = (seed - k[0]) + v;
                        break;
                    }
                }
                n.push(p);
            }
            seeds = n;
            map.clear();
            continue;
        }
        let digits = line.match(/\d+/g);
        if (digits == null) {continue}
        digits = [...digits].map(v=>Number(v));
        switch (part) {
            case 0:
                seeds.push(...digits);
                break;
            default:
                map = combineMaps(map, new Map([
                    [
                        [digits[1], digits[1] + digits[2] - 1], digits[0]
                    ]
                ]));
                break;
        }
    }
    return Math.min(...seeds);
}