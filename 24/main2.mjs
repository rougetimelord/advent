import { init } from "z3-solver"
import { Vector, cross, dot } from "../shared/matrix.mjs";
import { str2Lines, stripWhiteSpace } from "../shared/string.mjs";

class Hail extends Vector{
    /**
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} z 
     * @param {Number} vx 
     * @param {Number} vy 
     * @param {Number} vz 
     */
    constructor(x, y, z, vx, vy, vz) {
        super(x,y,z)
        this.d = new Vector(Number(vx), Number(vy), Number(vz))
    }
    toString() {
        return `(${this.d.x}t + ${this.x}, ${this.d.y}t + ${this.y})`;
    }
    /**
     * @param {Number} t 
     * @returns 
     */
    atTime(t) {
        return new Vector(this.x + this.d.x * t, this.y + this.d.y * t, this.z + this.d.z * t);
    }
}

/**
 * @param {string} s
 * @returns {number}
 */
export const main = async (s) => {
    let lines = str2Lines(s).map((v) =>
        v.split("@").map((v) => stripWhiteSpace(v).split(",")),
    );
    /**
     * @type {Hail[]}
     */
    let hails = [];
    for (let v of lines) {
        hails.push(new Hail(...v[0], ...v[1]));
    }
    const {Context, em} = await init();
    const {Solver, Int} = new Context("main");
    /** 
     * @type {import("z3-solver").Solver}
     */
    const solver = new Solver();
    const rP = [..."xyz"].map(n => Int.const(n)), rV = [..."uvw"].map(n => Int.const(n))
    hails.forEach((v, i) => {
        const t_i = Int.const(`t_${i}`);
        ["x", "y", "z"].forEach((u, j) => {
            solver.add(
                Int.val(v[u])
                    .add(t_i.mul(v.d[u]))
                    .sub(rP[j])
                    .sub(t_i.mul(rV[j]))
                    .eq(0)
            )
        })
    });
    await solver.check()
    em.PThread.terminateAllThreads();
    return rP.map(c => solver.model().eval(c)).map(Number).reduce((p, v) => p + v);
}