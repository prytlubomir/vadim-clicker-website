import { createServer } from 'node:http';
import fileserver from './fileserver.mjs';

const host = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
    console.log(req.method, req.url);
    fileserver.server(req, res);
});
server.listen(port, host, () => {
    console.log('Server started at', host+':'+port);
});

export {
    server, host, port
}