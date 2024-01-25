import { column } from "../../shared/array.mjs";
import { splitToArray, str2Lines } from "../../shared/string.mjs"

/**
 * @param {string} s
 * @returns {number}
 */
export const main = (s, p2=false) => {
    let grid = str2Lines(s)
            .map(v => splitToArray(v).map(v => [Number(v), false, 0]));

    for(let idx = 0; idx < grid.length; idx++) {
        const c = column(grid, idx)
        //Walk up and down column
        for(let jdx = 0; jdx < c.length; jdx++) {
            const tree = c[jdx][0];
            const top = c.slice(0, jdx).map(v=>v[0]);
            if(tree == Math.max(...top, tree) && !top.includes(tree)) {
                grid[jdx][idx][1] = true;
                continue;
            }
            
            const bottom = c.slice(jdx + 1).map(v=>v[0]);
            if(tree == Math.max(...bottom, tree) && !bottom.includes(tree)) {
                grid[jdx][idx][1] = true;
            }
        }


        const r = grid[idx];
        for(let kdx = 0; kdx < r.length; kdx++) {
            const tree = r[kdx][0];
            const right = r.slice(0, kdx).map(v=>v[0]);
            if(tree == Math.max(...right, tree) && !right.includes(tree)) {
                grid[idx][kdx][1] = true;
                continue;
            }

            const left = r.slice(kdx + 1).map(v=>v[0]);
            if(tree == Math.max(...left, tree) && !left.includes(tree)) {
                grid[idx][kdx][1] = true;
            }
        }
    }

    return grid.reduce((p, c) => p + c.reduce((w, v) => w + v[1], 0), 0)
}