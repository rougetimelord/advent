const fs = require("fs");

import("./main.mjs")
    .then(async mod => {
        const log = (await import("../../shared/logger.mjs")).log;
        const data = fs.readFileSync(
            `${__dirname}/test_data.txt`, {encoding: "utf8"}
        );

        const ans = 157;
        log(mod.main(data), ans);

        const ans2 = 70;
        log(mod.main2(data), ans2);
    });