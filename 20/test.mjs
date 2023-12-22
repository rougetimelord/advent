import { log } from "../shared/logger.mjs"
import { main } from "./main.mjs";

const ans = 0 /**@todo fill in sample answer */;
const data = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`;

log(main(data), ans)