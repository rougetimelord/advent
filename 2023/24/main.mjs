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
export const main = (s, bounds = [200000000000000, 400000000000000], dim=2) => {
    let lines = str2Lines(s).map((v) =>
        v.split("@").map((v) => stripWhiteSpace(v).split(",")),
    );
    let hails = [], intersections =[];
    for (let v of lines) {
        hails.push(new Hail(...v[0], ...v[1]));
    }
    for (let [i, a] of hails.entries()){
        const da = a.d;
        if (dim == 2) {
            a.z = 0, da.z = 0
        }
        for (let j = i + 1, b = hails[j]; j < hails.length; j++, b = hails[j]) {
            const db = b.d;
            if (dim == 2) {
                b.z = 0, db.z = 0
            }
            if (cross(da, db).isZero()) {
                continue;
            }
            const t1 = cross(b.minus(a), db), t2 = cross(da, db), t = t1.oppositeDirection(t2) ? -1 : 1 * t1.magnitude / t2.magnitude;
            const s1 = cross(a.minus(b), da), s2 = cross(db, da), s = s1.oppositeDirection(s2) ? -1 : 1 * s1.magnitude / s2.magnitude;
            const i1 = a.atTime(t);
            if((t >= 0 && s >= 0) && i1.x >= bounds[0] && i1.x <= bounds[1] && i1.y >= bounds[0] && i1.y <= bounds[1]){
                intersections.push(i1);
            }
        }
    }
    return intersections.length;
};
