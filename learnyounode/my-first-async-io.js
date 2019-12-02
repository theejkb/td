
const { readFile } = require('fs');
const path = process.argv[2];

readFile(path, "utf8",(err, data) => {
    if (err) {
        return console.error(err);
    }

    const result = data.split('\n').length - 1;

    console.log(result);
} );

