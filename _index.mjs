import { parseFilePath, serveFile, error } from './modules/fileserver.mjs';


async function handler(event) {
    let result = {
        statusCode: 500,
        body: 'Not assigned',
        headers: {}
    }

    if (event.httpMethod == "GET") {
        let filepath = parseFilePath(event.path);
        result = await serveFile(filepath);
    } else {
        result = error(405, 'Method "'+event.httpMethod+'" is not allowed!')
    }

    return result;
}

export { handler };