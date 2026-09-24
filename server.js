import { createServer } from 'node:http';
import fs from 'node:fs';


function handler(req, res) {
    console.log('req');
    console.log(req.url);
    res.writeHead(200);
    let filepath = 'index.html';
    if (req.url != "/") {
        filepath = './'+req.url;
    }
    console.log('filepath', filepath);
    fs.readFile(filepath, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        res.end(data);
    });
}


const server = createServer(handler);

server.listen(3000, '127.0.0.1', () => {
    console.log('Server started at localhost:3000');
});
