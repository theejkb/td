
const { readFileSync } = require('fs');
const path = process.argv[2];

const fileContent = readFileSync(path)

const result = fileContent.toString().split('\n').length - 1

console.log(result)