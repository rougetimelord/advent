/**
 * @typedef posObject
 * @type {object}
 * @property {Number} x
 * @property {Number} y
 * @property {string} [type]
*/
/**
 * @typedef MetaPos
 * @property {Number} steps
 * @property {posObject} start
 * @property {posObject} current
 * @property {posObject} last
 * @property {number} width
 */

/**
 * @param {string} s 
 * @returns 
 */
export const main = (s) => {
    const lines = s.split("\n");
    /**
     * @type {MetaPos}
     */
    let position = {steps: 0, width: lines.length};
    for(let [y, line] of lines.entries()) {
        let x = line.indexOf("S");
        if(x != -1){
            position.start = {'x':x, 'y':y, type: "S"};
            position.current = {'x':x, 'y':y, type: "S"};
            position.last = {'x':x, 'y':y, type: "S"};
            break;
        }
    }
    walk(position, lines);
    return Math.ceil(position.steps/2)
}

const dirs = {
    "down": [0, 1],
    "right": [1, 0],
    "up": [0, -1],
    "left": [-1, 0],
    "all": [[0, 1],[1, 0],[0, -1],[-1, 0]]
}

/**
 * @param {posObject} pos 
 * @param {String[]} lines
 * @returns {posObject}
 */
const next = (pos, lines) => {
    //down, right, up, left
    let nexts = []
    switch (pos.current.type) {
        case "|":
            nexts.push(dirs.up, dirs.down)
            break;
        case "-":
            nexts.push(dirs.left, dirs.right)
            break;
        case "L":
            nexts.push(dirs.up, dirs.right)
            break;
        case "J":
            nexts.push(dirs.up, dirs.left)
            break;
        case "7":
            nexts.push(dirs.down, dirs.left)
            break;
        case "F":
            nexts.push(dirs.down, dirs.right)
            break;
        default:
            nexts.push(...dirs.all)
            break;
    }
    //map possible directions on to actual position. Then filter for past visitation and whether it's a valid pipe
    let nO = nexts.map(
        v => {
            let obj = {};
            obj.x = pos.current.x + v[0];
            obj.y = pos.current.y + v[1];
            return obj
        }
    )
    nO = nO.filter(
        v => (v.x !== pos.last.x || v.y !== pos.last.y))
    nO = nO.filter(v => {
        if(!lines[v.y][v.x]) {
            return false}
        let t = lines[v.y][v.x].match(/[\|\-LJ7FS]/);
        if(t){
            v.type = t[0];
            return true;
        } else {
            return false;
        }
    })
    return nO.at(0)
}

/**
 * @param {MetaPos} pos 
 * @param {string[]} lines 
 * @returns {MetaPos}
 */
const walk = (pos, lines) => {
    while(pos.current.type !== "S" ||
    pos.steps == 0){
        let n = next(pos, lines);
        pos.last = {...pos.current};
        pos.current = {...n};
        pos.steps++;
    }
    return pos
}
