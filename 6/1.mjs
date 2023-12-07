/**
 * @param {string} v 
 */
const prox = (v) => {
    const lines = v
        .replace("\n", "|")
        .replace(/\s+/g, ";")
        .split("|");
    let ts = lines[0].split(":;")[1].split(";");
    let ds = lines[1].split(":;")[1].split(";");
    /** @type {string[][]} */
    let r = [];
    for (let i = 0; i < ts.length; i++) {
        r.push([Number(ts[i]), Number(ds[i])]);
    }
    return r;
}

const prox2 = (v) => {
    const lines = v
        .replace("\n", "|")
        .replace(/\s/g, "")
        .split("|");
    return [lines[0].split(":")[1], lines[1].split(":")[1]];
}

const quad = (a, b, c, x) => a * Math.pow(x, 2) + b * x + c

const solve = (a, b, c) => {
    let r1 = ((-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a));
    let r2 = ((-1 * b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a));
    return [r1, r2]
        .sort((a, b) => a - b)
        .map((v,i) =>
            (i == 0) ? Math.ceil(v) : Math.floor(v)
        ).map((v, i) => 
            (i == 0 && quad(a, b, c, v) <= 0) ?
                v + 1 :
            (quad(a, b, c, v) <= 0) ?
                v - 1 :
            v);
}

const racer = (races) =>{
    let res = 1;
    for (let race of races) {
        let roots = solve(-1, race[0], -1 * race[1]);
        res = res * (roots[1] - roots[0] + 1);
    }
    return res;
}

export const part1 = (raw) => {
    const races = prox(raw);
    return racer(races);
}

export const part2 = (raw) => {
    let race = prox2(raw)
    return racer([race])
}