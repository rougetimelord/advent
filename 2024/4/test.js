const fs = require("fs");

import("./main.mjs")
    .then(async module => {
        const log = (await import("../../shared/logger.mjs")).log;
        const data = fs.readFileSync(
            `${__dirname}/test_data.txt`, {encoding: "utf8"}
        );

        const ans = 18;

        log(module.main(data), ans);

        const ans2 = 9;

        log(module.partTwo(data), ans2);
    });