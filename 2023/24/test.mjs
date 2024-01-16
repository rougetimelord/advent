import { log } from "../shared/logger.mjs";
import { main } from "./main.mjs";

const ans = 2; /**@todo fill in sample answer */
const data = `19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3`;

log(main(data, [7,27]), ans);
