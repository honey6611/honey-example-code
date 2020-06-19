import * as chai from 'chai';
import 'mocha';
chai.expect;
chai.should();
const expect = chai.expect;

import RdfParse from './rdf-parser';
import { promises as fsPromises } from 'fs';
import * as cheerio from 'cheerio';


describe('rdf-parser', () => {

    describe('on construction', () => {
        it('It initialises', () => {
            const rdfObj = new RdfParse(
                '../test/mock/pg1.rdf',
                cheerio,
                fsPromises
            );
            expect(rdfObj).not.to.be.undefined;
        });
    });
    describe('init', () => {
        it('should return correct metadata', async () => {
            const rdfObj = new RdfParse(
                '../test/mock/pg1.rdf',
                cheerio,
                fsPromises
            );

            const data = await rdfObj.init();
            expect(data).to.eql({
                ebook_no: '1',
                title: 'The Declaration of Independence of the United States of America',
                authors: 'Jefferson, Thomas',
                publisher: 'Project Gutenberg',
                publication_date: '1971-12-01',
                language: 'en',
                subjects: 'United States. Declaration of Independence,United States -- History -- Revolution, 1775-1783 -- Sources',
                license: 'Public domain in the USA.'
            });
        });

        it('should return undefined if file doesnot exist', async () => {
            const rdfObj = new RdfParse(
                '../test/mock/doesnotexistpg1.rdf',
                cheerio,
                fsPromises
            );

            const data = await rdfObj.init();
            expect(data).to.be.undefined;
        });

    });
});