// const { createServer } = require('http');
// const fileserver = require('./modules/fileserver.mjs');


import { createServer } from 'node:http';
import fileserver from './modules/fileserver.mjs';

const endpoint = process.env.AWS_LAMBDA_HTTP_ENDPOINT;
const [host, port] = endpoint ? endpoint.split(':') : ['127.0.0.1', 3000];

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