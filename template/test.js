const fs = require("fs");

import("./main.mjs")
    .then(mod => mod.main)
    .then(async main => {
        const log = (await import("../../shared/logger.mjs")).log;
        const data = fs.readFileSync(
            `${__dirname}/test_data.txt`, {encoding: "utf8"}
        );

        // Fill these in :) 
        const ans = 0;
        const ans2 = 0;

        main(data, ans, ans2);
    });