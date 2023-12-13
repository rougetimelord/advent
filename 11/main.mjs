/**
 * @typedef Point
 * @property {number} x
 * @property {number} y
 * 
 * @typedef {Point[]} StarMap
 * 
 * @typedef {Map<string, Set<number>} EmptySpace
 * 
 * @typedef {String[][]} Matrix
 */

import { isEmpty, rotate } from "./utils.mjs";


/**
 * @param {string} s 
 */
export const main = (s, eF=2) => {
    /** @type {Matrix} */
    let matrix = s.split("\n").map(v => v.split(''));
    let emptySpace = findEmptySpace(matrix);
    let starMap = createMap(matrix, emptySpace);
    let distances = getDistances(starMap, emptySpace, eF);
    return distances.reduce((pv, cv) => pv + cv);
}

/**
 * @param {Matrix} m
 */
const findEmptySpace = (m) => {
    /** @type {EmptySpace} */
    let empty = new Map([
        ['rows', new Set()],
        ['columns', new Set()]
    ]);
    for(let i of m.keys()){
        if(isEmpty(m[i], ".")) {
            empty.get("rows").add(i);
        }
    }
    const rm = rotate(m)
    for(let j of rm.keys()){
        if(isEmpty(rm[j], ".")){
            empty.get("columns").add(j)
        }
    }
    return empty
}

/**
 * @param {Matrix} s
 * @param {EmptySpace} e
 */
const createMap = (s, e) =>{
    /** @type {StarMap} */
    let result = [], id = 1;
    for(let [i, v] of s.entries()) {
        if(e.get("rows").has(i)) continue;
        for(let [j, w] of v.entries()) {
            if(e.get("columns").has(j)) continue;
            else if(w == "#") {
                result.push({"x": j, "y": i, "id": id++});
            }
        }
    }
    return result
}

/**
 * 
 * @param {Point} a 
 * @param {Point} b 
 * @param {EmptySpace} emptySpace 
 */
const emptySpaceBetween = (a, b, emptySpace) => {
    let xSort = [a, b].sort((a, b) => a.x - b.x), ySort = [...xSort].sort((a, b) => a.y - b.y), total = 0;
    for(let i = xSort[0].x + 1; i < xSort[1].x; i++){
        if(emptySpace.get("columns").has(i)){
            total++;
        }
    }
    for(let j = ySort[0].y + 1; j < ySort[1].y; j++){
        if(emptySpace.get("rows").has(j)){
            total++;
        }
    }
    return total;
}

/**
 * 
 * @param {StarMap} map 
 * @param {number} eF 
 * @param {EmptySpace} emptySpace
 */
const getDistances = (map, emptySpace, eF) => {
    let distances = []
    for(let [i, a] of map.entries()){
        for(
            let b of map.toSpliced(0, i + 1).values()
        ){
            let base = Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
            base += (eF-1) * emptySpaceBetween(a, b, emptySpace);
            distances.push(base)
        }
    }
    return distances;
}