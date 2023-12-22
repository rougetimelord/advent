import { Part } from "./Part.mjs";
import { Pulse } from "./Pulse.mjs";

export class FlipFlop extends Part {
    constructor(name) {
        super(name);
        this.state = false;
    }
    /**
     * 
     * @param {Pulse} pulse 
     * @returns {Pulse}
     */
    input(pulse) {
        super.input(pulse)
        if(pulse.type == "L") {
            this.state = !this.state;
            (this.state) ? pulse.high : pulse.low;
            return pulse;
        }
        return null;
    }
}