const fs = require("fs");

import("./main.mjs")
    .then(async module => {
        const log = (await import("../../shared/logger.mjs")).log;
        const data = fs.readFileSync(
            `${__dirname}/prod_data.txt`, {encoding: "utf8"}
        );

        log(module.main(data));

        log(module.partTwo(data));
    });