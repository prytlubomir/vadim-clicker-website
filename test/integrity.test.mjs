import { describe, test, after } from 'node:test';
import assert from 'node:assert';

import fs from 'node:fs';

import { server, host, port } from '../index.js';


function testUrl(sufix = '') {
    return 'http://' + host + ':' + port + '/' + sufix
}

describe('Response integrity test', () => {
    after(() => {
        return new Promise((resolve) => { server.close(resolve) });
    })

    test('Request text', async () => {
        const path = "styles/style.css";
        const file = fs.readFileSync(path, "utf-8");
        const res = await fetch(testUrl(path));
        const cont = await res.text();
        assert.strictEqual(cont, file, "Event text is corrupted");
    });

    test('Request an image', async () => {
        const path = "cdn/gui.png";
        const file = fs.readFileSync(path);
        const fileDec = new Int8Array(file);
        
        const res = await fetch(testUrl(path));
        const blob = await res.blob();
        const buffer = await blob.arrayBuffer();
        const resDec = new Int8Array(buffer);

        for (let i = 0; i <= fileDec.length; i++) {
            assert.strictEqual(resDec[i], fileDec[i], "Image is corrupted");
        }
    });

    test('Request an archive', async () => {
        const path = "download/VadimsClicker.exe";
        const file = fs.readFileSync(path);
        const fileDec = new Int8Array(file);
        
        const res = await fetch(testUrl(path));
        const blob = await res.blob();
        const buffer = await blob.arrayBuffer();
        const resDec = new Int8Array(buffer);

        for (let i = 0; i <= fileDec.length; i++) {
            assert.strictEqual(resDec[i], fileDec[i], "Image is corrupted");
        }
    });
    
});