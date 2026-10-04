import { createServer } from 'node:http';
import fs from 'node:fs';

import mime from 'mime';


async function fileserver(req, res) {
    console.log(req.url, req.method);
    if (req.method == "GET") {
        let filepath = './' + req.url;
        if (req.url == "/") {
            filepath = 'index.html'
        }
        try {
            let data = fs.readFileSync(filepath);
            res.writeHead(200, { 'Content-Type': mime.getType(filepath) });
            res.write(data);
        }
        catch (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('<h1> 404 </h1><p> Content not found </p>');
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'text/html', 'Allowed': 'GET' });
        res.write('<h1> 405 </h1><p> Method "'+req.method+'" is not allowed!</p>');
    }
    res.end();
}


const host = '127.0.0.1';
const port = 3000;

const server = createServer(fileserver);
server.listen(port, host, () => {
    console.log('Server started at', host+':'+3000);
});
