import { Part } from "./Part.mjs";
import { Pulse } from "./Pulse.mjs";

export class Broadcaster extends Part {
    constructor(name) {
        super(name)
    }
    /**
     * @param {Pulse} pulse 
     * @returns {Pulse}
     */
    input(pulse) {
        super.input(pulse)
        return pulse
    }
}