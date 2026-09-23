import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';


async function handler(req, res) {
    console.log('req');
    res.writeHead(200);
    let filepath = 'index.html';
    if (req.url != "/") {
        filepath = './'+req.url;
    }
    let content = await readFile(filepath);
    res.end(content);
}


const server = createServer(handler);

server.listen(3000, '127.0.0.1', () => {
    console.log('Server started at localhost:3000');
});
