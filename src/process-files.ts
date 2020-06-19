import RdfParse from './rdf-parser';
import { testFolder } from './index';
import * as cheerio from 'cheerio';
import { promises as fsPromises } from 'fs';

export async function process(filelist, model): Promise<void> {
    for (var i = 0; i < filelist.length; i++) {
        const rdf = new RdfParse(
            `../${testFolder}/${filelist[i]}/pg${filelist[i]}.rdf`,
            cheerio,
            fsPromises);
        const data = await rdf.init();
        try {
            await model.create(data);
        }
        catch (e) {
            console.log('error while updating database');
        }
    }
}