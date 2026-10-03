import { createServer } from 'node:http';
import fs from 'node:fs';

import mime from 'mime';


function errorHandler(res, err) {
    if (err.code == 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html'});
        res.end('<h1> 404 </h1><p> Content not found </p>');
    } else {
        res.writeHead(500, { 'Content-Type': 'text/html'});
        res.end('<h1> 500 </h1><p> Oops! Something went wrong. </p>');
    }
}


async function handler(req, res) {
    console.log('req');
    console.log(req.url);
    let filepath = 'index.html';
    if (req.url != "/") {
        filepath = './'+req.url;
    }
    console.log('filepath', filepath);
    fs.readFile(filepath, (err, data) => {
        if (err) {
            console.error(err);
            errorHandler(res, err)
            return;
        }
        console.log('path', filepath, 'type', mime.getType(filepath));
        res.writeHead(200, {'Content-Type': mime.getType(filepath)});
        res.end(data);
    });
}


const server = createServer(handler);

server.listen(3000, '127.0.0.1', () => {
    console.log('Server started at localhost:3000');
});
