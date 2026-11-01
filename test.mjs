import { describe, test, after } from 'node:test';
import assert from 'node:assert';

import { server, host, port } from './index.js';


function testUrl(sufix = '') {
    return 'http://' + host + ':' + port + '/' + sufix
}

async function post(url, fallback = 'timeout') {
    try {
        return await fetch(url, { method: "POST", signal: AbortSignal.timeout(1000) });
    } catch {
        return fallback;
    }
}

describe('Integration testing', () => {
    after(() => {
        return new Promise((resolve) => { server.close(resolve) });
    })

    // Success responses

    test('Main page test', async () => {
        const res = await fetch(testUrl());
        assert.strictEqual(res.status, 200, 'Main page ' + res.status);
    });

    // Error responses
    // GET
    // 404
    test('Not found url', async () => {
        const res = await fetch(testUrl('reservednotfound'));
        assert.strictEqual(res.status, 404, 'Page not found failed ' + res.status);
    });

    test('Ivalid GET parameters', async () => {
        const res = await fetch(testUrl('?reservedinvalidparameter=reservedinvalidvalue'));
        assert.strictEqual(res.status, 404, 'Invalid GET parameter failed ' + res.status);
    });

    test('Ivalid file path', async () => {
        const res = await fetch(testUrl('?file=/reserved/non/existing/path.test'));
        assert.strictEqual(res.status, 404, 'Invalid file path failed ' + res.status);
    });

    // POST
    // 405
    
    test('Not allowed page test', async () => {
        const res = await post(testUrl());
        assert.notEqual(res, 'timeout', 'Server crashed');
        assert.strictEqual(
            res.status,
            405,
            'Failure: POST requests allowed ' + res.status
        );
    });

    test('Not allowed with a GET parameter ', async () => {
        const res = await post(testUrl('?reservedinvalidparameter'));
        assert.notEqual(res, 'timeout', 'Server crashed');
        assert.strictEqual(
            res.status,
            405,
            'Failure: POST requests allowed ' + res.status
        );
    });

    test('Not allowed with a GET parameter and value', async () => {
        const res = await post(testUrl('?reservedinvalidparameter=reservedinvalidvalue'));
        assert.notEqual(res, 'timeout', 'Server crashed');
        assert.strictEqual(
            res.status,
            405,
            'Failure: POST requests allowed ' + res.status
        );
    });

    // Cascading failures
    
    test('Not allowed/Not found test', async () => {
        const res = await post(testUrl('reservednotfound'));
        assert.notEqual(res, 'timeout', 'Server crashed');
        assert.notEqual(res.status, 200, 'Request validation failed compeletely');
        assert.notEqual(res.status, 404, 'Method validation failed');
        assert.equal(res.status, 405, 'Unknown status code ' + res.status);
    })

    test('Not allowed/Not found with a GET parameter', async () => {
        const res = await post(testUrl('reservednotfound?reservedinvalidparameter'));
        assert.notEqual(res, 'timeout', 'Server crashed');
        assert.notEqual(res.status, 200, 'Request validation failed compeletely');
        assert.notEqual(res.status, 404, 'Method validation failed');
        assert.equal(res.status, 405, 'Unknown status code ' + res.status);
    })
    
    
    test('Not allowed/Not found with a GET parameter and value', async () => {
        const res = await post(testUrl(
            'reservednotfound?reservedinvalidparameter=reservedinvalidvalue'
        ));
        assert.notEqual(res, 'timeout', 'Server crashed');
        assert.notEqual(res.status, 200, 'Request validation failed compeletely');
        assert.notEqual(res.status, 404, 'Method validation failed');
        assert.equal(res.status, 405, 'Unknown status code ' + res.status);
    })
});
