import { rotate } from "../11/utils.mjs";

/**
 * @typedef Point
 * @property {number} x
 * @property {number} y
 */

/**
 * @param {string} s 
 */
export const main = (s) => {
    const m = s.split("\n").map(v => v.split(""));
    const m90 = rotate(m);
    /**
     * @type {Point[]}
     */
    let rocks = []
    for(let [i, row] of m.entries()) {
        for(let [j, v] of row.entries()) {
            if(v == "O") {
                rocks.push({x: j, y: i});
            }
        }
    }
    rocks.sort((a, b) =>
        (a.x == b.x) ? a.y - b.y : a.x - b.x);
    let sum = 0
    for (let rock of rocks) {
        let [x, y] = [rock.x, rock.y], 
            t = m90[x].lastIndexOf("#", y),
            s = (y > t && t >= 0) ? t + 1: 0,
            minY = m90[x].slice(s, y).indexOf(".") + s;
        if (minY < s) {minY = y};
        m[y][x] = ".", m[minY][x] = "O";
        m90[x][y] = ".", m90[x][minY] = "O";
        rock.y = minY;
        sum += m90[0].length - minY;
    }
    return sum;
}