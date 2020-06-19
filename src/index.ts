import chunkArray from './chunk-array';

import Authors from './database/models/authors';
import Subjects from './database/models/subjects';
import Books from './database/models/books';
export const testFolder = './files/bz/cache/epub';
import * as fs from 'fs';
import { process } from './process-files';
import async from 'async';

const chunks: number = 1000;
const concurrency: number = 4;

(async function init() {
    // create a queue object
    const q = async.queue(function (task, callback) {
        callback();
    }, concurrency);

    q.drain(() => console.log('all items have been processed'));

    const items = fs.readdirSync(testFolder);
    const chunkedArray = chunkArray(items, chunks);

    for (var i = 0; i < chunkedArray.length; i++) {
        q.push(process(chunkedArray[i], Books), err => console.log(`finished processing`));
    }
})();
