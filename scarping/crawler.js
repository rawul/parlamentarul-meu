const cheerio = require('cheerio')
const fs = require('fs');
const path = require('path');
const needle = require('needle');
const removeAccents = require('remove-accents');
const { normalizeName, subsetsOf2, hash } = require('./utils');

const url = 'https://www.hotnews.ro/';

const visitedLinksMap = new Map();

const politicians =
    [...require('./people_info/dump/deputies.json'), ...require('./people_info/dump/deputies.json')]
        .map(p => ({
            name: p.name,
            normalizedName: normalizeName(p.name),
            subsets: subsetsOf2(normalizeName(p.name).split(' ')).map(name => name.join(' '))
        }));

const articles = [];

const isPoliticianInString = (str) => {
    return politicians.find(p => (str.includes(p.normalizedName) || (p.subsets.find(subset => str.includes(subset)) && p))) || null
}

const checkLink = async (link) => {
    const response = await needle('GET', link);
    const $ = cheerio.load(response.body);
    const title = $('[property="og:title"]').attr('content');
    if (title) {
        const normalizedTitle = removeAccents(title).toLowerCase();
        const politician = isPoliticianInString(normalizedTitle);
        console.log({ normalizedTitle, politician })
        if (politician) {
            console.log({ normalizedTitle, politician })
        }
    }
}

// console.log(subsetsOf2(['dragnea', 'nicolae', 'liviu']).toArray());
// const p = politicians.find(t => t.normalizedName.includes('dragnea'));
// const title = removeAccents('Iohannis, despre protestatarii ridicați de jandarmi la Topoloveni: Cred că aici avem imaginea Rom&acirc;niei lui Dragnea. Cine nu e cu Liviu Dragnea va fi arestat!').toLowerCase();

// console.log(p.subsets.find(subset => title.includes(subset)));

checkLink('https://www.hotnews.ro/stiri-esential-23148949-iohannis-despre-protestatarii-ridicati-jandarmi-topoloveni-cred-aici-avem-imaginea-romaniei-lui-dragnea-cine-nu-liviu-dragnea-arestat.htm');
// (async () => {
//     const response = await needle('GET', 'https://www.hotnews.ro/');
//     const $ = cheerio.load(response.body);
//     const pageLinks = $('a')
//         .map(function () { return $(this).attr('href') })
//         .get()
//         .filter(link => !visitedLinksMap.get(hash(link)))
//         .forEach(link => {
//             checkLink(link)
//         });
// })();