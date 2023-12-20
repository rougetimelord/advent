import {str2Lines} from "../shared/string.mjs"
/**
 * @param {string} s
 * @returns {number}
 */
export const main = (s) => {
    const ls = str2Lines(s);
    const workLs = ls.slice(0, ls.indexOf(''));
    const partLs = ls.slice(ls.indexOf('') + 1);
    const wSet = new WFSet(workLs);
    const parts = partLs.map(v => new Part(v));
    let sum = 0;
    for (let part of parts) {
        console.log(part.string)
        let r = wSet.run(part);
        if(r == "A") {sum += part.sum};
        console.log(`Final status: ${r}`)
    }
    return sum;
}

class WFSet {
    constructor (strArr) {
        /**
         * @type {Map<WorkFlow.name, WorkFlow>}
         */
        this.workFlows = new Map()
        for (let v of strArr) {
            let t = new WorkFlow(v);
            this.workFlows.set(t.name, t);
        }
    }
    /**
     * @param {Part} part 
     */
    run (part) {
        let res = "in"
        do {
            res = this.workFlows.get(res).run(part);
        } while (res != "R" && res != "A")
        part.status = res;
        return res;
    }
}
/**
 * @class
 */
class WorkFlow {
    /**
     * @param {String} str 
     */
    constructor(str) {
        /**
         * @type {string}
         * @public
         */
        this.name = str.split("{")[0];
        /**
         * @type {Rule[]}
         */
        this.rules = [];
        let rs = str.split("{")[1].replace("}", "").split(",");
        for (let r of rs) {
            this.rules.push(new Rule(r));
        }
    }
    /**
     * @param {Part} part 
     * @returns {WorkFlow.name}
     */
    run(part) {
        console.log(`Running ${this.name}`)
        let res;
        for (let rule of this.rules) {
            res = rule.test(part)
            if(res !== false) {
                break
            }
        }
        return res;
    }
}

class Rule {
    /**
     * @param {string} str 
     */
    constructor (str) {
        if (str.includes(":")) {
            /**
             * @type {string|boolean}
             */
            this.condition = str.split(":")[0];
            /**
             * @type {WorkFlow.name}
             */
            this.destination = str.split(":")[1];
        }
        else {
            this.condition = true;
            this.destination = str;
        }
    }
    /**
     * Returns false if condition not met or name if met
     * @param {Part} part
     * @returns {WorkFlow.name | boolean}
     */
    test (part) {
        if (this.condition === true) {
            return this.destination
        }
        let prop = this.condition[0];
        switch (this.condition[1]) {
            case ("<"):
                if (part[prop] < this.condition.slice(2)) {
                    return this.destination;
                }
                break;
            case (">"):
                if (part[prop] > this.condition.slice(2)) {
                    return this.destination;
                }
                break;
            default:
                break;
        }
        return false;
    }
}

/**
 * @class
 * @property {number | undefined} x
 * @property {number | undefined} m
 * @property {number | undefined} a
 * @property {number | undefined} s
 */
class Part {
    /**
     * 
     * @param {string} str 
     */
    constructor(str) {
        this.orig = str;
        let s = str.replace(/\{|\}/g,"").split(",");
        for (let v of s) {
            this[v[0]] = Number(v.split("=")[1]);
        }
        /**
         * Always "P", "R" or "A"
         * @typedef {string} Status
         */
        this.status = "P"
    }
    get sum() {
        let s = 0;
        for (let v of ["x", "m", "a", "s"]) {
            if (this[v] != undefined) {
                s += this[v]
            }
        }
        return s;
    }
    get string() {
        return `${this.orig} | ${this.status}`
    }
}