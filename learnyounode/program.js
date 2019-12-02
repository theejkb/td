const http = require('http');
const url = process.argv[2];

const data = '';


http.get(url, function callback(response){
    response.setEncoding('utf8');
    response.on('data', (res)=> {
        data.push(res);
    });
response.on('end', (end) => {
    console.log(data.length);
    console.log(data.join(''))
});
});