import fs from 'node:fs';

import mime from 'mime';

import md from './md.mjs';


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
        code: code,
        content: '<h1>' + code + '</h1><p>' + message + '</p>',
        headers: { 'Content-Type': 'text/html'}
    }
}

async function serveFile(filepath) {
    let result = {};
    try {
        let data = fs.readFileSync(filepath, 'utf-8');
        let mimeType = mime.getType(filepath);
        data = await applyMods(data, mimeType);
        result = {
            code: 200,
            content: data,
            headers: { 'Content-Type': mimeType }
        }
    } catch (err) {
        result = error(404, 'Content not found');
    }

    return result;
}

async function server(req, res) {
    let result = { code: 500, content: 'Not assigned', headers: {} }
    if (req.method == "GET") {
        let filepath = parseFilePath(req.url);
        result = await serveFile(filepath);
    } else {
        result = error(405, 'Method "'+req.method+'" is not allowed!')
    }
    res.writeHead(result.code, result.headers);
    res.write(result.content);
    res.end();
}

export default {
    server
}
