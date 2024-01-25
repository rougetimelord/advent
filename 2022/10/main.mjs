import { str2Lines } from '../../shared/string.mjs'

/**
 * @param {string} s
 * @returns {number | string}
 */
export const main = (s, p2=false) => {
    const instructions = str2Lines(s);
    // Write lock, register, and instCounter
    let write = {pending: false, startCycle: 0, value: 0}, x = 1, pc = 0;
    // 6 row display
    let display = ["", "", "", "", "", ""];
    // Result var
    let result = 0;

    // Go through clock cycles
    for(let cycle = 1; cycle <= p2 ? 240 : 220 && pc < instructions.length; cycle++){
        const instruction = instructions[pc];

        // Draw display for part 2
        if (p2){
            const [drawX, drawY] = [(cycle - 1) % 40, Math.floor((cycle - 1) / 40)]
            if(x == drawX || x - 1 == drawX || x + 1 == drawX) {
                display[drawY] += "#";
            }
            else {
                display[drawY] += ".";
            }
            console.group(cycle);
            console.log(display.join("\n"));
            console.groupEnd();
        }

        // Special cycles for part 1
        switch (cycle) {
            case 20:
            case 60:
            case 100:
            case 140:
            case 180:
            case 220:
                result += x * cycle;
                break;
            default:
                break;
        }

        // Settle outstanding write
        if(write.pending && write.startCycle + 1 == cycle){
            // Commit write
            x += write.value;
            // Release lock
            write.pending = false;
            pc++;
        }
        else if(instruction == "noop") {
            // This cycle means nothing
            pc++;
        }
        else {
            // Get the value to add
            const val = Number(instruction.split(" ").pop());
            // Take write lock
            write = {pending: true, startCycle: cycle, value: val};
        }
    }

    if(p2){return display.join("\n")};
    return result;
}