const readMyFile = require('./utils');

const destination = process.argv[2];
const extension = process.argv[3];

readMyFile(destination, extension, (err, data) => {
    if(err) {
        console.error(err);
    }
    data.forEach(file => console.log(file));
});