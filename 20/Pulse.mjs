export class Pulse {
    /**
     * @type {number}
     */
    static id = 0;
    static resetID() {
        Pulse.id = 0;
    }
    #type = undefined;
    /**
     * 
     * @param {"L" | "H" | undefined} type 
     * @param {string[] | undefined} history 
     */
    constructor (type=undefined, history=undefined) {
        /**
         * @type {"L" | "H"}
         */
        this.#type = type || "L";
        this.id = Pulse.id++;
        /**
         * @type {string[]}
         */
        this.history = history || ["button"];
    }
    copy () {
        return new Pulse(this.#type, this.history);
    }
    toString(){
        return `Pulse ${this.id}, currently ${this.#type}`
    }
    high() {
        this.#type = "H"
    }
    low() {
        this.#type = "L"
    }
    get type() {
        return this.#type
    }
}