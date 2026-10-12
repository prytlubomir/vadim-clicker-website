import { describe, test, after } from 'node:test';
import assert from 'node:assert';

import { server, host, port } from './server.mjs';


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
    test('Main page test', async () => {
        const res = await fetch(testUrl());
        assert.strictEqual(res.status, 200, 'Main page ' + res.status);
    });
    test('Not found page test', async () => {
        const res = await fetch(testUrl('reservednotfound'));
        assert.strictEqual(res.status, 404, 'Not found failed ' + res.status);
    });
    test('Not allowed page test', async () => {
        const res = await post(testUrl());
        assert.notEqual(res, 'timeout', 'Server crashed');
        assert.strictEqual(
            res.status,
            405,
            'Failure: POST requests allowed ' + res.status
        );
    });
    test('404 with 405 test', async () => {
        const res = await post(testUrl('reservednotfound'));
        assert.notEqual(res, 'timeout', 'Server crashed');
        assert.notEqual(res.status, 200, 'Request validation failed compeletely');
        assert.notEqual(res.status, 404, 'Method validation failed');
        assert.equal(res.status, 405, 'Unknown status code ' + res.status);
    })
});