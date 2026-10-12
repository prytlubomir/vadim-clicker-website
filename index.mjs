import { parseFilePath, serveFile, error } from './fileserver.mjs';


async function handler(event) {
    let result = {
        statusCode: 500,
        body: 'Not assigned',
        headers: {}
    }
    
    const req = event.requestContext.http;
    if (req.method == "GET") {
        let filepath = parseFilePath(req.path);
        result = await serveFile(filepath);
    } else {
        result = error(405, 'Method "'+req.method+'" is not allowed!')
    }

    return result;
}