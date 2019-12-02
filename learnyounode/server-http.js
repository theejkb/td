//creation SERVEUR DE FICHIERS HTTP
const http = require('http')
const port = process.argv[2];
const path = process.argv[3];
const fs = require('fs');



const server = http.createServer((request, response) => {
        const stream = fs.createReadStream(path)
        stream.pipe(response);
});
server.listen(port);