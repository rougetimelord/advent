import { splitEmptyLines, str2Lines } from "../../shared/string.mjs"

/**
 * @param {string} s
 * @param {boolean} [p2=false]
 * @returns {string}
 */
export const main = (s, p2=false) => {
    //Split stack description from instructions
    const a = splitEmptyLines(s);
    const crates = str2Lines(a[0]), instructions = str2Lines(a[1]);

    /** @type {Map<Number, Stack>} */
    const stacks = new Map();
    //Use the last line of the stacks description to create stacks
    for (let stackID of crates.pop().replace(/\s/g, '').split('')) {
        stacks.set(Number(stackID), new Stack())
    }
    /**
     * Put crates into their stacks
     * Have to reverse to go from bottom to top
     */
    for(const crateStr of crates.reverse()) {
        /**
         * First remove empty spaces where crates should be
         * Then strip spaces and brackets
         */
        const crateArr = crateStr.replace(/(?<= |^)\s{3}(?= |$)/g, "-").replace(/\[|\]|\s{1}/g,'').split('');
        // Add all of the crates on the line to the right stack
        crateArr.forEach((v, i) => {
            if(v != "-") {
                stacks.get(i + 1).add(new Crate(v));
            }
        })
    }
    // Follow instructions
    for(const instruction of instructions){
        // Find all digits and interpret
        const nums = [...instruction.matchAll(/\d+/g)].map(v => Number(v[0])), quantity = nums[0], from = nums[1], to = nums[2];
        // Temp crates to shift
        let crates2move = stacks.get(from).remove(quantity);
        // Flip for part 2
        if(p2) {crates2move.reverse()}
        // Shift the crates
        stacks.get(to).add(...crates2move);
    }
    let res = ""
    // Get stack tops
    for(const key of stacks.keys()) {
        res += stacks.get(key).top.id;
    }
    return res;
}

/**
 * @class Crate
 */
class Crate {
    /**
     * @param {string} id 
     */
    constructor(id) {
        this.id = id
    }
}

/**
 * @Class Stack
 */
class Stack {
    /**
     * Construct an empty stack
     */
    constructor() {
        /** @type {Crate[]} */
        this.arr = []
    }
    /**
     * @returns {Crate}
     */
    get top() {
        return this.arr.at(-1);
    }
    /**
     * @param  {...Crate} crates 
     */
    add(...crates) {
        for(const crate of crates){
            this.arr.push(crate);
        }
    }
    /**
     * @param {Number} n 
     * @returns 
     */
    remove(n) {
        /**
         * Flip here because the internal array is bottom to top
         * Need to remove from top to bottom in part 1
         */
        return this.arr.splice(-n).reverse();
    }
}
