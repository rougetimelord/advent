/**
 * 
 * @param {Number[]} a 
 * @param {Number[]} b 
 * @returns 
 */
export const isFullyContained = (a, b) => {
    if (a[0] >= b[0] && a[1] <= b[1]) {
        return true;
    }
    if (b[0] >= a[0] && b[1] <= a[1]) {
        return true;
    }
    return false;
}

export const overlaps = (a, b) => {
    if ((a[0] >= b[0] && a[0] <= b[1]) ||
        (a[1] >= b[0] && a[1] <= b[1])) {
            return true
        }
    if ((b[0] >= a[0] && b[0] <= a[1]) ||
        (b[1] >= a[0] && b[1] <= a[1])) {
        return true
    }
    return false;
}