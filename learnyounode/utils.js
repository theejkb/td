const fs = require("fs");

function readMyFile(destination, extension, callback) {
    const reg = new RegExp(`.*\.${extension}$` );

    fs.readdir(destination, (err, files) => {
        if (err) {
            return callback(err);
        }

        const filteredFiles = files.filter(files => files.match(reg));

        callback(null, filteredFiles);
    });
}

module.exports = readMyFile;