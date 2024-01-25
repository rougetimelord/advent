const fs = require("fs");

import("./main.mjs")
    .then(mod => mod.main)
    .then(async main => {
        const log = (await import("../../shared/logger.mjs")).log;
        const data = fs.readFileSync(
            `${__dirname}/test_data.txt`, {encoding: "utf8"}
        );

        const ans = 0 /**@todo fill in sample answer */;

        log(main(data), ans);
    });