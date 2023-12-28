export class Vector {
    /**
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} z 
     */
    constructor(x,y, z) {
        /**
         * @type {Number}
         */
        this.x = Number(x);
        /**
         * @type {Number}
         */
        this.y = Number(y);
        /**
         * @type {Number}
         */
        this.z = Number(z);
    }
    isZero() {
        return (this.x == 0) && (this.y == 0) && (this.z == 0);
    }
    /**
     * 
     * @param {Vector} b 
     * @returns 
     */
    minus(b) {
        return new Vector(this.x - b.x, this.y - b.y, this.z - b.z);
    }
    /**
     * 
     * @param {Vector} b 
     * @returns 
     */
    divide(b){
        return new Vector(this.x / b.x, this.y / b.y, this.z / b.z)
    }
    get magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2)
    }
    /**
     * @param {Vector} b 
     */
    oppositeDirection(b) {
        return dot(this, b) < 0;
    }
}

/**
 * @param {Vector} p1 
 * @param {Vector} p2 
 * @returns {number}
 */
export const dot = (p1, p2) =>
    p1.x * p2.x + p1.y * p2.y + p1.z * p2.z;

/**
 * @param {Vector} p1 
 * @param {Vector} p2
 * @returns
 */
export const cross = (p1, p2) =>
new Vector(p1.y * p2.z - p2.y * p1.z, p1.z * p2.x - p2.z * p1.x, p1.x * p2.y - p2.x * p1.y)