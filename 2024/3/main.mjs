/**
 * @param {string} s
 * @param {?boolean} p2
 * @returns {number}
 */
export const main = (s, p2 = false) => {
    const mulRegex = /(mul\([0-9]{1,3},[0-9]{1,3}\)|do\(\)|don't\(\))/g;
    const matches = s.match(mulRegex);

    let sum = 0;
    let active = true;
    for (const match of matches) {
        if (match == 'do()' || match == 'don\'t()') {
            if(!p2) {
                continue;
            }
            if(match == 'do()') {
                active = true;
            }
            else {
                active = false;
            }
            continue;
        }
        if(active) {
            const numberRegex = /[0-9]{1,3}/g;
            const nums = match.match(numberRegex);
            sum += Number(nums[0]) * Number(nums[1]);
        }
    }
    return sum;
}