import { splitEmptyLines, str2Lines } from '../../shared/string.mjs'

/**
 * @param {string} s
 * @returns {number}
 */
export const main = (s) => {
    const monkeys = splitEmptyLines(s).map(str2Lines),
        /** @type {Map<number, Monkey>} */
        monkeyMap = new Map();

    // Pull monkey descriptions
    for(const monkeyBlock of monkeys){
        // Pul number from line 0
        const id = Number(monkeyBlock[0].match(/\d+/)[0]);
        // Pull numbers from line 1
        const items = [...monkeyBlock[1].matchAll(/\d+/g)].map(v=>Number(v[0]))
        // Create function from line 2
        const op = new Function('v', `return v ${monkeyBlock[2].split(" ").slice(-2).join(" ")}`)
        // Pull last word from line 3
        const test = Number(monkeyBlock[3].split(" ").pop())
        // Pull last words from line 4 and 5
        const passes = [Number(monkeyBlock[4].split(" ").pop()), Number(monkeyBlock[5].split(" ").pop())];
        // Create and store monkee
        monkeyMap.set(id, new Monkey(items, op, test, passes))
    }

    //Do rounds
    for(let roundNo = 0; roundNo < 20; roundNo++){
        /** @type {Map<number,number[]>[]} */
        let roundPasses = []
        // Do the round
        for(const monkey of monkeyMap.values()) {
            roundPasses.push(monkey.doRound())
        }
        // Then pass items
        for(const passes of roundPasses) {
            for(const [target, items] of passes.entries()) {
                monkeyMap.get(target).addItems(items);
            }
        }
    }

    /**
     * pick 2 that had most cumulative items
     * multiply how many cumulative items
     */
    for(const monkey of monkeyMap.values()) {
        //idk what to put here
    }
}

class Monkey {
    /**
     * @param {number[]} items
     * @param {function} op 
     * @param {number} test 
     * @param {number[]} passes 
     */
    constructor(items, op, test, passes){
        this.items = items;
        this.op = op;
        this.test = test;
        this.passes = passes;
        this.inspections = 0;
    }

    /** */
    addItems(items) {
        this.items.push(...items)
    }

    doRound() {
        /** @type {Map<number, number[]>} */
        let passMap = new Map();
        for(const item of this.items) {
            let target = 0;
            inspections++;
            // do operation
            op(item);
            // relief
            item = Math.floor(item / 3);
            if(item % this.test == 0) {
                //do pass to true
                target = this.passes[0];
            }
            else {
                //do pass to false
                target = this.passes[1];
            }
            if(passMap.has(target)) {
                passMap.get(target).push(target)
            }
            else {
                passMap.set(target, [item]);
            }
        }
        //empty inventory
        this.items = []
        //return pass object idk
        return passMap;
    }

    toString() {
        return `${this.items.join(", ")} ${this.inspections}`
    }
}