//creation SERVEUR DE FICHIERS HTTP
const http = require('http');
const port = process.argv[2];
const path = process.argv[3];
const post = process.argv[1];
const fs = require('fs');
const map = require('through2-map');

const changerUpperCase = map ({wantStrings : true}, function (str) {
    return str.toUpperCase();
});

const server = http.createServer((req, res) => {
    if (req.method === 'POST'){
        res.writeHead(404);
    };
    req.pipe(changerUpperCase).pipe(res);

});
server.listen(port);