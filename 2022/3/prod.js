const fs = require("fs");

import("./main.mjs")
    .then(async mod => {
        const log = (await import("../../shared/logger.mjs")).log;
        const data = fs.readFileSync(
            `${__dirname}/prod_data.txt`, {encoding: "utf8"}
        );

        log(mod.main(data));
        
        log(mod.main2(data));
    });