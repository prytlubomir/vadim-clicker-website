import querystring from 'node:querystring';
import fs from 'node:fs';

import mime from 'mime';
import isBinaryPath from 'is-binary-path';

import md from './md.mjs';


/**
 * 
 * @param  {String} url - request URL
 * @return {String}     - URL tail that contains only GET params
 * 
 *                         Example: "example.com/somepage?param=val
 *                         - discarded - "example.com/somepage"
 *                         - separator - "?"
 *                         - return - "param=val"
 */
function separateParams(url) {
    const [head, tail] = url.split('?');
    return tail;
}

function paramRoute(url) {
    const tail = separateParams(url);
    let filepath = 'index.html'
    if (tail) {
        const params = querystring.parse(tail);
        filepath = './' + params.path;
    }
}

function parseFilePath(url) {
    let filepath = './' + url;
    if (url == "/") {
        filepath = 'index.html';
    }
    return filepath;
}

async function applyMods(data, mimeType) {
    let modded = data;
    switch (mimeType) {
        case 'text/html':
            try {
                modded = await md.insertMd(data);
            } catch (err) {
                console.log(err);
            }
    }
    return modded;
}

function error(code, message) {
    return {
        statusCode: code,
        body: '<h1>' + code + '</h1><p>' + message + '</p>',
        headers: { 'Content-Type': 'text/html'}
    }
}

async function serveFile(filepath) {
    let result = {};
    try {        
        let mimeType = mime.getType(filepath);
        const isBinary = isBinaryPath(filepath);
        const encoding = isBinary ? 'binary' : 'utf-8';
        
        let data = fs.readFileSync(filepath, encoding)
        data = await applyMods(data, mimeType);

        // if (isBinary) {
        //     let buffer = Buffer.from(data, encoding);
        //     data = buffer.toString('base64');
        // }
        
        result = {
            statusCode: 200,
            body: data,
            headers: { 'Content-Type': mimeType }
        }
    } catch (err) {
        result = error(404, 'Content not found');
    }

    return result;
}

async function server(req, res) {
    let result = { statusCode: 500, body: 'Not assigned', headers: {} }
    if (req.method == "GET") {
        let filepath = parseFilePath(req.url);
        result = await serveFile(filepath);
    } else {
        result = error(405, 'Method "'+req.method+'" is not allowed!')
    }
    res.writeHead(result.statusCode, result.headers);
    res.write(result.body);
    res.end();
}


export default {
    server, parseFilePath, serveFile, error
}

export {
    server, parseFilePath, serveFile, error
}
