const http = require('http');
const [node, path, ...urls] =  process.argv;
const results = {};

urls.forEach((url)=>{
    http.get(url, (res) => {
        const dataArray = [];
        res.on('data', d => dataArray.push(d));
        res.on('end', () => {
           results[url] = dataArray.join('');

           const keys = Object.keys(results);
           if (keys.length === urls.length){
               urls.forEach(u => console.log(results[u]));

           }
        })
    })
});