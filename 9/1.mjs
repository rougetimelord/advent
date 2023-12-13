export const main = async (s) => {
    return Promise.all(
        s.split("\n")
            .map(v => [...v.split(" ")
                .map(v => Number(v))
            ])
            .map(v => handleLine(v))
    ).then(v => v.reduce((pv, cv) => [pv[0] + cv[0], pv[1] + cv[1]], [0, 0]));
}

const handleLine = async (arr) => {
    let sequences = [arr, ...(await makeDSeq(arr))].reverse();
    console.groupCollapsed();
    [...sequences].reverse().forEach(v=>console.debug(v));
    console.groupEnd();
    while(sequences.length > 1) {
        sequences[1].push(
            sequences[0].at(-1) + sequences[1].at(-1)
        );
        sequences[1].unshift(
            sequences[1].at(0) - sequences[0].at(0)
        )
        sequences.shift();
    }
    return [arr.at(0), arr.at(-1)];
}

/**
 * @param {Number[]} arr 
 * @returns {Number[][]}
 */
const makeDSeq = async (arr) => {
    let seq = [];
    for(let i = 0; i < arr.length - 1; i++){
        seq.push(arr[i + 1] - arr[i]);
    }
    if(seq.every((v, _, a) => v == a[0])){
        return [seq]
    }
    else {
        return [seq, ...(await makeDSeq(seq))]
    }
}