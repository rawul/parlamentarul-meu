const cheerio = require('cheerio')
const fs = require('fs');
const path = require('path');
const needle = require('needle');
const removeAccents = require('remove-accents');
const MongoClient = require('mongodb').MongoClient;
const URI = require('urijs');
const { normalizeName, subsetsOf2, hash, isURLValid, isNamedInculded } = require('./utils');

let db = null;

const url = (process.argv.length && process.argv[2] && new URI(process.argv.length && process.argv[2]))
    || new URI('https://www.hotnews.ro/');

const visitedLinksMap = new Map();

const politicians =
    [...require('./people_info/dump/deputies.json'), ...require('./people_info/dump/senators.json')]
        .map(p => ({
            name: p.name,
            normalizedName: normalizeName(p.name),
            subsets: subsetsOf2(normalizeName(p.name).split(' ')).map(name => name.join(' '))
        }));

const articles = [];

const isPoliticianInString = (str) => {
    return politicians.find(p => (isNamedInculded(str, p.normalizedName) || (p.subsets.find(subset => isNamedInculded(str, subset)) && p))) || null
}

const isVisited = async (link) => {
    const found = await db.collection('visited_urls').findOne({ link: link.toString() });
    return found;
}

const checkLink = async (link) => {
    console.log('\x1b[33m scraping ', link.toString());
    try {
        const response = await needle('GET', link.toString());
        const $ = cheerio.load(response.body);
        const title = $('[property="og:title"]').attr('content');

        await db.collection('visited_urls').insertOne({ link: link.toString() })
        if (title) {
            const normalizedTitle = removeAccents(title).toLowerCase();
            const politician = isPoliticianInString(normalizedTitle);
            if (politician) {
                console.log('\x1b[32m found', politician.name)
                db.collection('articles').insertOne({ link, title, politician })
                articles.push({ link, title, politician })
            } else {
                console.log('\x1b[31m not found')
            }
        }
        const pageLinks = $('a')
            .map(function () {
                try {
                    return URI($(this).attr('href'), url).toString();
                } catch {
                    return null;
                }
            })
            .get()
            .filter(link => link !== null && isURLValid(url, URI(link)))
        // console.log(url);
        for (let link of pageLinks) {
            if (!await isVisited(link)) {
                await checkLink(link)
            }
        }
    } catch (e) {
        console.log('\x1b[31m [SOME ERROR OCCURED] ... skipping', e);
    }
}

(async () => {
    const client = await MongoClient.connect('mongodb://localhost:27017/unihack', { useNewUrlParser: true });
    db = client.db();
    // const t = URI('ew/ewq', url);
    // console.log({ t: t.domain(), f: isURLValid(url, t) })
    checkLink(url);
})();