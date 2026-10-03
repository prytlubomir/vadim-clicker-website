import { createServer } from 'node:http';
import fs from 'node:fs';

import mime from 'mime';


function errorHandler(res, err) {
    console.error(err);
    if (err.code == 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html'});
        res.end('<h1> 404 </h1><p> Content not found </p>');
    } else {
        res.writeHead(500, { 'Content-Type': 'text/html'});
        res.end('<h1> 500 </h1><p> Oops! Something went wrong. </p>');
    }
}


async function fileserver(req, res) {
    console.log(req.url);
    let filepath = 'index.html';
    if (req.url != "/") {
        filepath = './'+req.url;
    }
    fs.readFile(filepath, (err, data) => {
        if (err) { errorHandler(res, err); return; }
        res.writeHead(200, {'Content-Type': mime.getType(filepath)});
        res.end(data);
    });
}


const host = '127.0.0.1';
const port = 3000;

const server = createServer(fileserver);
server.listen(port, host, () => {
    console.log('Server started at', host+':'+3000);
});
