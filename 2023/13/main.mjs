const rotate = (matrix) => {
    let res = [];
    for(let i of matrix[0].keys()){
        res.push(column(matrix, i));
    }
    return res;
}

const column = (matrix, i) => {
    return [...matrix].map(v => v[i])
}

const reflects = (a, b, ad) => {
    let maxD = Math.min(a.length, b.length)
    for(let i = a.length - maxD, j = maxD - 1; i < a.length && j >= 0; i++, j--) {
        if(!(a[i] instanceof Array)) {
            debugger
        }
        let d = 0;
        for(let idx of a[i].keys()){
            if(a[i][idx] != b[j][idx]) {
                d += 1
                if(d > ad){
                    return false;
                }
            }
        }
    }
    return true;
}

/**
 * 
 * @param {string} s 
 */
export const main = (s, ad=0) => {
    let lines = s.split("\n"), matrices = [];
    lines.push('')
    for(let i = 0, tmp = []; i < lines.length; i++) {
        if(lines[i] == ''){
            matrices.push(tmp);
            tmp = [];
        } else {
            tmp.push(lines[i].split(""));
        }
    }
    return matrices.map((matrix) => {
        let ref = findReflection(matrix, ad);
        if(ref > 0){ return ref*100}
        ref = findReflection(rotate(matrix), ad);
        if(ref > 0){ return ref}
        return 0
    });
}

const findReflection = (matrix, ad) => {
    for(let i = 1; i < matrix.length; i++){
        let a = matrix.slice(0, i), b = matrix.slice(i);
        if(reflects(a,b, ad)){
            return i
        };
    }
    return 0
}