import { addArrays, rotate } from "../../shared/array.mjs";
import { splitToArray, str2Lines } from "../../shared/string.mjs";

const up = 0;
const right = 1;
const down = 2;
const left = 3;

/**
 * @param {string} s
 * @returns {number}
 */
export const main = (s) => {
    const lines = str2Lines(s);
    let matrix = lines.map(splitToArray);
    let col = 0, row = 0;
    const width = matrix[0].length, height = matrix.length;
    let dir = up;

    for (let i = 0; i< lines.length; i++) {
        const line = lines[i];
        const x = line.indexOf('^');
        if (x >= 0) {
            row = i;
            col = x;
            matrix[row][col] = 'X';
            break;
        }
    }
    
    let flag = false;
    let nextRow, nextCol
    while (!flag) {
        switch (dir) {
            case up:
                nextRow = row - 1;
                if (nextRow < 0) {
                    flag = true;
                }
                else {
                    if (matrix[nextRow][col] == "#") {
                        dir = right;
                    }
                    else {
                        matrix[nextRow][col] = 'X';
                        row = nextRow;
                    }
                }
                break;
            case right:
                nextCol = col + 1;
                if (nextCol >= height) {
                    flag = true;
                }
                else {
                    if (matrix[row][nextCol] == "#") {
                        dir = down;
                    }
                    else {
                        matrix[row][nextCol] = 'X';
                        col = nextCol;
                    }
                }
                break;
            case down:
                nextRow = row + 1;
                if (nextRow >= height) {
                    flag = true;
                }
                else {
                    if (matrix[nextRow][col] == "#") {
                        dir = left;
                    }
                    else {
                        matrix[nextRow][col] = 'X';
                        row = nextRow;
                    }
                }
                break;
            case left:
                nextCol = col - 1;
                if (nextCol < 0) {
                    flag = true;
                }
                else {
                    if (matrix[row][nextCol] == "#") {
                        dir = up;
                    }
                    else {
                        matrix[row][nextCol] = 'X';
                        col = nextCol;
                    }
                }
                break;
        }
    }
    
    console.log(`final:\n`, ...matrix.map(v=>v.join('') + '\n'));

    const final = matrix.map(v => v.join('')).join('');
    return (final.match(/X/gi) || []).length;
}