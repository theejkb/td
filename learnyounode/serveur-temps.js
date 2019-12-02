const net = require('net')
const port = process.argv[2];

function gestDate(nb){
    if (nb<10){
        nb = '0'+nb;
    }
    return nb;
}
const server = net.createServer(function (socket) {
    const date = new Date();
    let result = date.getFullYear()+
        '-'+gestDate(date.getMonth() + 1)+
        '-'+gestDate(date.getDate()) +
        '-'+gestDate(date.getHours())+
        '-'+gestDate(date.getMinutes()) + ' \n';
    // logique de gestion de la socket
})
server.listen(8000)
console.log(server);