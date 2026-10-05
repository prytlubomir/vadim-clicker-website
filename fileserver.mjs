import fs from 'node:fs';

import mime from 'mime';

import './md.mjs'


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
            let mimeType = mime.getType(filepath);
            if (mimeType == 'text/html') {
                console.log('brakes here');
                data = md.insertMd(data);
                console.log('if not reaches here')
            }
            res.writeHead(200, { 'Content-Type': mimeType });
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