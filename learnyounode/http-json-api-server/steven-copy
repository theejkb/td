const http = require('http');
const fs = require('fs');
const url = require('url');

const routes = {
    "/api/parsetime": function(parsedUrl) {
        const d = new Date(parsedUrl.query.iso);
        return {
            hour: d.getHours(),
            minute: d.getMinutes(),
            second: d.getSeconds()
        };
    },
    "/api/unixtime": function(parsedUrl) {
        return {unixtime: (new Date(parsedUrl.query.iso)).getTime()};
    }
}

server = http.createServer(function(request, response) {
    const parsedUrl = url.parse(request.url, true);
    const resource = routes[parsedUrl.pathname];
    if (resource) {
        response.writeHead(200, {"Content-Type": "application/json"});
        response.end(JSON.stringify(resource(parsedUrl)));
    }
    else {
        response.writeHead(404, 'URL not found');
        response.end();
    }
});
server.listen(process.argv[2]);
