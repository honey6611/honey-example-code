/**
  * rdf-parser.js Module:
  * ====================
  * DESCRIPTION: Parses a rdf file and takes its basic structure in an object
  *              with fields:
  *                  _id: numerical string
  *                 title: string
  *                 authors: array
  *                 subjects: array
  *              This code is from  "Node.js the Right Way" (by
  *              Jim R. Wilson) chapter 5 with change in lines 41 and 42
  *              https://pragprog.com/book/jwnode/node-js-the-right-way)
  * EXPORT:      anonymous functions (filename,callback(err,parsedObject)).
  * MODIFY:      Loads the callback's second parameter.
  * USAGE:       ---
  *              const
  *                 parser=require("./rdf-parser.js"),
  *              parser("the_rdf_file.rdf",function(err,parsedObject){
  *                // take actions for this reading
  *              });
  *              ---
  *
  * https://gist.github.com/alesscor/68cf26e74ddd1768b9b0
  **/

import * as path from 'path';

export default class RdfParse {
    private fileContent;
    private cherioObj;
    constructor(
        private readonly filename: string,
        private readonly cheerIO,
        private readonly fileSystem) { }

    public async init(): Promise<BookMetadata | undefined> {
        const data = await this.readFile(this.filename);
        if (data) {
            const cherioObj = this.cheerIO.load(data.toString());
            return <BookMetadata>{
                ebook_no: cherioObj('pgterms\\:ebook').attr('rdf:about').replace('ebooks/', ''),
                title: cherioObj('dcterms\\:title').text(),
                authors: cherioObj('pgterms\\:agent pgterms\\:name')
                    .map((idx, ele) => cherioObj(ele).text()).get().join(','),
                publisher: cherioObj('dcterms\\:publisher').text(),
                publication_date: cherioObj('dcterms\\:issued').text(),
                language: cherioObj('dcterms\\:language rdf\\:value').text(),
                subjects: cherioObj('[rdf\\:resource$="/LCSH"]')
                    .parent().find('rdf\\:value')
                    .map((idx, ele) => cherioObj(ele).text()).get().join(','),
                license: cherioObj('dcterms\\:rights').text()
            };
        }
        else {
            return undefined;
        }
    }

    private async readFile(filename: string) {
        try {
            const returnData = await this.fileSystem.readFile(path.join(__dirname, filename), 'utf8');
            return returnData;
        }
        catch (e) {
            console.log(`Error reading file `, e);
            return undefined;
        }
    }

}


export interface BookMetadata {
    ebook_no: number;
    title: string;
    authors: string;
    publisher: string;
    publication_date: string;
    language: string;
    subjects: string;
    license: string;
}
