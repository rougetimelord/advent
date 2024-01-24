export class Path {
    /**
     * @param {String[]} [path=String[]]
     */
    constructor(path=[]) {
        this.path = path
    }
    /**
     * Combines to string
     */
    get string() {
        let res = ""
        for(const part of this.path) {
            if(part != "/") {
                res += part + "/";
            }
            else {
                res += part;
            }
        }
        return res;
    }
    /**
     * @param {String} part 
     */
    addPart(part) {
        this.path.push(part);
    }
    /**
     * Move up one level
     */
    moveUp() {
        this.path.pop();
    }
    /**
     * @returns {String}
     */
    toString() {
        return this.string;
    }
    get array() {
        return this.path;
    }
}