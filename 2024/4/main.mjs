import { addArrays, getAdjacentValues } from "../../shared/array.mjs";
import { splitToArray, str2Lines } from "../../shared/string.mjs"

/**
 * @param {string} s
 * @returns {number}
 */
export const main = (s) => {
    /**
     * find all instances of xmas in input
     * can be vertical, horizontal, or diagonal
     * can be backwards and overlapping  
     */
    /**
     * - find coordinates of all xs
     * - check all adjacent squares for ms
     * - check in same direction for an a
     * - then s
     */
    const lines = str2Lines(s);
    const matrix = lines.map(splitToArray);

    let xCoords = []

    for (let i = 0, line = lines[0]; i < lines.length; line = lines[++i]) {
        let xs = line.matchAll(/x/gi);
        for (let value of xs) {
            xCoords.push({coord: [i, value.index], dir: undefined})
        }
    }

    const mCoords = findNextChar(matrix, 'M', xCoords, false);
    const aCoords = findNextChar(matrix, 'A', mCoords, true);
    const sCoords = findNextChar(matrix, 'S', aCoords, true);

    return sCoords.length;
}

/**
 * @param {string[][]} matrix
 * @param {string} char
 * @param {{coord: [number, number], dir: [number, number] | undefined}[]} coords
 * @param {boolean=false} dirs
 * @returns {Array<{coord: [number, number], dir: [number, number]}>}
 */
const findNextChar = (matrix, char, coords, dirs=false) => {
    if (!dirs) {
        const result = [];
        for (const coord of coords) {
            let filteredAdjacentValues = getAdjacentValues(matrix, coord.coord).filter(v => v.val == char);
            for (const value of filteredAdjacentValues) {
                result.push({coord: addArrays(coord.coord, value.dir), dir: value.dir})
            }
        }
        return result;
    }

    const result = []
    for (const coord of coords) {
        const newCoord = addArrays(coord.coord, coord.dir);
        const newVal = matrix?.[newCoord[0]]?.[newCoord[1]];
        if (typeof newVal !== undefined && newVal == char) {
            result.push({coord: newCoord, dir: coord.dir})
        }
    }
    return result;
}