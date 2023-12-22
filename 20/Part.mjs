import { Pulse } from "./Pulse.mjs";

export class Part {
    /**
     * @param {string} name
     * @param {Part|null} destination 
     */
    constructor (name){
        this.name = name;
        return;
    }
    /**
     * @param {Pulse} pulse 
     * @returns {null}
     */
    input(pulse) {
        pulse.history.unshift(this.name);
        return null;
    }
    toString() {
        return `Part ${this.name}`;
    }
}