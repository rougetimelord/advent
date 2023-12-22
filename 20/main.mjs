import { getMany } from "../shared/map.mjs";
import { str2Lines } from "../shared/string.mjs"
import { Broadcaster } from "./Broadcaster.mjs";
import { Conjunction } from "./Conjunction.mjs";
import { FlipFlop } from "./FlipFlop.mjs";
import { Part } from "./Part.mjs";
import { Pulse } from "./Pulse.mjs";

/**
 * @param {string} s
 * @returns {number}
 */
export const main = (s) => {
    const nGraph = constructGraph(s);
    runOnce(nGraph);
}

/**
 * @typedef {Map<string, [Part, string[]]>} NetworkGraph
 */

/**
 * @param {string} s
 * @returns {NetworkGraph}
 */
const constructGraph = (s) => {
    const lines = str2Lines(s);
    let networkGraph = new Map();
    for (let line of lines) {
        const lineA = line.replace(" ", "").split("->"), name = lineA[0], dests = lineA[1].split(",");
        if(name == "broadcaster") {
            networkGraph.set(name, [new Broadcaster(name), dests]);
        }
        else {
            switch(name[0]) {
                case "%":
                    networkGraph.set(name.slice(1), [new FlipFlop(name), dests])
                    break;
                case "&":
                    networkGraph.set(name.slice(1), [new Conjunction(name), dests])
                    break;
                default:
                    break;
            }
        }
    }
    return networkGraph;
}

/**
 * @param {NetworkGraph} nGraph 
 */
const runOnce = (nGraph) => {
    Pulse.resetID();
    /**
     * @type {Map<number, [Pulse, string[]]}
     */
    let pulses = new Map([
        [0, [new Pulse(), ["broadcaster"]]]
    ]);
    while (pulses.size > 0) {
        const top = [...pulses.keys()][0];
        let next = top + 1;
        const pulse = pulses.get(top)[0], dests = getMany(nGraph, ...pulses.get(top)[1]);
        for(let dest of dests) {
            console.log(`${pulse} going to ${dest[0]}`)
            const r = dest[0].input(pulse.copy());
            if (r != null) {
                pulses.set(next++, [r, dest[1]]);
            }
            pulses.delete(top);
        }
    }
}