import { any } from "../shared/map.mjs";
import { Part } from "./Part.mjs";
import { Pulse } from "./Pulse.mjs";

export class Conjunction extends Part {
    constructor(name) {
        super(name);
        /**
         * @type {Map<string, Pulse>}
         */
        this.state = new Map();
    }
    /**
     * @param {Pulse} pulse 
     */
    input(pulse) {
        this.state.set(pulse.history[0], pulse.copy())

        if (any(this.state, (v) => v.pulse.type == "L")) {
            pulse.high();
        }
        else {
            pulse.low();
        }

        super.input(pulse);
        return pulse;
    }
}