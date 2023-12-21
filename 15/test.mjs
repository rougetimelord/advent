import { log } from "../shared/logger.mjs"
import { main } from "./main.mjs";

const ans = 145 /**@todo fill in sample answer */;
const data = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

log(main(data, true), ans)