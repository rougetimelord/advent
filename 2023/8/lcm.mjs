const gcd = (a, b) => !b ? a : gcd(b, a % b)
export const findLCM = (arr) => {
    let res = arr[0];
    for(let v of arr.splice(1)) {
        res = ((v * res) / (gcd(v, res)))
    }
    return res;
}

console.assert(findLCM([ 2, 7, 3, 9, 4 ]) == 252)