import * as logger from "../shared/logger.mjs";
import { main } from "./main.mjs";

const data = `7JJJ5 5
44456 1`;

// const ans = 6440;
// const r = main(data);
// logger.log(r, ans);

const r2 = main(data, true), a2 = 11;
logger.log(r2, a2)