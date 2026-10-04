import fs from 'node:fs';

import mime from 'mime';


function getPath(req) {
    let filepath = './' + req.url;
    if (req.url == "/") {
        filepath = 'index.html'
    }
    return filepath;
}

async function fileserver(req, res) {
    if (req.method == "GET") {
        let filepath = getPath(req);
        try {
            let data = fs.readFileSync(filepath);
            res.writeHead(200, { 'Content-Type': mime.getType(filepath) });
            res.write(data);
        } catch (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('<h1> 404 </h1><p> Content not found </p>');
        } 
    } else {
        res.writeHead(405, { 'Content-Type': 'text/html', 'Allowed': 'GET' });
        res.write('<h1> 405 </h1><p> Method "'+req.method+'" is not allowed!</p>');
    }
    res.end();
}

export default {
    serve: fileserver
}