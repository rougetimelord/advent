import { splitEmptyLines, str2Lines } from "../../shared/string.mjs";

/**
 * @param {string} s
 * @param {boolean} p2=false
 * @returns {number}
 */
export const main = (s, p2=false) => {
    const [rules, updates] = splitEmptyLines(s).map(str2Lines);
    const rulesRegex = ingestRules(rules);

    let sum = 0;  
    let /** @type {string[]} */ incorrect = [];
    for (const update of updates) {
        if (rulesRegex.test(update)) {
            incorrect.push(update);
            continue;
        }

        if (p2) {
            continue;
        }

        const nums = update.split(',').map(Number);
        sum += nums[Math.floor(nums.length / 2)]
    }

    if (p2) {
        return part2(incorrect, rulesRegex, rules)
    }
    return sum;
}

/**
 * 
 * @param {string[]} updates
 * @param {RegExp} rulesRegex
 * @param {String[]} rules 
 * @returns {number}
 */
const part2 = (updates, rulesRegex, rules) => {
    let rulesArray = ingestRules2(rules);
    let sum = 0;
    for (let update of updates) {
        while (rulesRegex.test(update)) {
            for (const rule of rulesArray) {
                const match = rule.exec(update);
                if (match) {
                    const left = match[1];
                    const right = match[2];
                    update = update.replace(right, left).replace(left, right)
                }
            }
        }
        const nums = update.split(',').map(Number);
        sum += nums[Math.floor(nums.length / 2)]
    }
    return sum;
}

/**
 * 
 * @param {string[]} s 
 * @returns {RegExp}
 */
const ingestRules = (s) => {
    let regex = [];
    for (const rule of s) {
        const [before, after] = rule.split('|');
        regex.push(`${after}.+${before}`);
    }
    return new RegExp(regex.join('|'));
}


const ingestRules2 = (s) => {
    const result = [];
    for (const rule of s) {
        const [before, after] = rule.split('|');
        result.push(new RegExp(`(${after}).+(${before})`));
    }
    return result;
}