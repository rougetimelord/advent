import { splitEmptyLines, str2Lines } from "../../shared/string.mjs";

let sMod = 1;

/**
 * @param {string} s
 * @returns {number}
 */
export const main = (s, p2 = false) => {
  const monkeys = splitEmptyLines(s).map(str2Lines),
    /** @type {Map<number, Monkey>} */
    monkeyMap = new Map();

  // Pull monkey descriptions
  for (const monkeyBlock of monkeys) {
    // Pull number from line 0
    const id = Number(monkeyBlock[0].match(/\d+/)[0]);
    // Pull numbers from line 1
    const items = [...monkeyBlock[1].matchAll(/\d+/g)].map((v) => Number(v[0]));
    // Create function from line 2
    const op = new Function(
      "old",
      `return ${monkeyBlock[2].split(" ").slice(-3).join(" ")};`,
    );
    // Pull last word from line 3
    const test = Number(monkeyBlock[3].split(" ").pop());
    // Pull last words from line 4 and 5
    const passes = [
      Number(monkeyBlock[4].split(" ").pop()),
      Number(monkeyBlock[5].split(" ").pop()),
    ];
    sMod *= test;
    // Create and store monkee
    monkeyMap.set(id, new Monkey(items, op, test, passes, p2));
  }

  //Do rounds
  const max = (p2) ? 10000 : 20;
  for (let roundNo = 1; roundNo <= max; roundNo++) {
    /** @type {Map<number, number[]>[]} */
    let roundPasses = [];
    // Do the round
    for (const [id, monkey] of monkeyMap.entries()) {
      // returns target: items...
      const passes = monkey.doRound();
      roundPasses.push(passes);
      for (const [t, i] of passes.entries()) {
        monkeyMap.get(t).addItems(i);
      }
 }
    if(roundNo % 1000 == 0 || roundNo == 1 || roundNo == 20) {
        console.log(`==After Round ${roundNo}==`);
        for(const [id, monkey] of monkeyMap.entries()) {
            console.log(`Monkey ${id}: ${monkey.inspections}`)
        }
    }
  }

  /**
   * pick 2 that had most cumulative items
   * multiply how many cumulative items
   */
  const sortedMonkeys = [...monkeyMap.values()]
    .sort((a, b) => b.inspections - a.inspections)
    .map((v) => v.inspections);
  return sortedMonkeys[0] * sortedMonkeys[1];
};

class Monkey {
  /**
   * @param {number[]} items
   * @param {function} op
   * @param {number} test
   * @param {number[]} passes
   * @param {boolean} p2
   */
  constructor(items, op, test, passes, p2) {
    this.items = items;
    this.op = op;
    this.test = test;
    this.passes = passes;
    this.inspections = 0;
    this.p2 = p2;
  }

  /** */
  addItems(items) {
    this.items.push(...items);
  }

  doRound() {
    /** @type {Map<number, number[]>} */
    let passMap = new Map();
    for (const item of this.items) {
      let target = 0;
      this.inspections++;
      // do operation
      let newItem = this.op(item);
      // relief
      if (!this.p2) {
        newItem = Math.floor(newItem / 3);
      }
      else if (this.p2) {
        newItem = newItem % sMod;
      }
      if (newItem % this.test == 0) {
        //do pass to true
        target = this.passes[0];
      } else {
        //do pass to false
        target = this.passes[1];
      }
      if (passMap.has(target)) {
        passMap.get(target).push(newItem);
      } else {
        passMap.set(target, [newItem]);
      }
    }
    //empty inventory
    this.items = [];
    //return pass object idk
    return passMap;
  }

  toString() {
    return `${this.items.join(", ")} inspections: ${this.inspections}`;
  }
}
