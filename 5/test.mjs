import { log } from "../shared/logger.mjs"
import { main } from "./main.mjs";

const ans = 50;
const data = `seeds: 79 10000

S-T-S:
50 79 100
0 5001 5000`;

log(main(data), ans)