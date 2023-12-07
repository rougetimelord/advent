export const objBuilder = (s) => {
    let ret = {}, arr = s.split("\n");
    for (let game of arr) {
        let id = Number(game.match(/(?<=Game )\d+/)[0]);
        ret[id] = {
            "redM": Math.max(
                ...[...game.matchAll(/\d+(?= red)/gi)].map(
                v => Number(v[0])),
                0),
            "redm": Math.min(
                ...[...game.matchAll(/\d+(?= red)/gi)].map(
                v => Number(v[0])),
                0),
            "greenM": Math.max(
                ...[...game.matchAll(/\d+(?= green)/gi)].map(
                    v => Number(v[0])), 
                0),
            "greenm": Math.min(
                ...[...game.matchAll(/\d+(?= green)/gi)].map(
                v => Number(v[0])),
                0),
            "blueM": Math.max(
                ...[...game.matchAll(/\d+(?= blue)/gi)]
                    .map(
                        v => Number(v[0])), 
                0),
            "bluem": Math.min(
                ...[...game.matchAll(/\d+(?= blue)/gi)].map(
                v => Number(v[0])),
                0),
            };
    }
    return ret;
}