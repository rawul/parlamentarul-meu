const cheerio = require('cheerio')
const fs = require('fs');
const path = require('path');
const needle = require('needle');

const filename = path.join(__dirname, 'dump/senators.json');

const domain = 'https://www.senat.ro/';
const parallelConnections = 10;

const getPersonPicture = async (personLink) => {
    console.log('getting picture for', personLink);
    const response = await needle('GET', personLink);
    const $ = cheerio.load(response.body);
    const relativeLink = $('input[type="image"]').attr('src');
    return `${domain}${relativeLink}`;
}
// $($0).attr('onclick');

const getPersonDetails = async ($, row) => {
    const name = $(row).find('td').eq(1).text().replace(/(^[\s\r\t]+|[\s\r\t]+$)/gm, '');
    const district = $(row).find('td').eq(3).text().replace(/(^[\s\r\t]+|[\s\r\t]+$)/gm, '');
    const party = $(row).find('td').eq(5).text().replace(/(^[\s\r\t]+|[\s\r\t]+$)/gm, '');
    if (district && party && name) {
        const pictureUrl = await getPersonPicture(`${domain}${$(row).find('a').attr('onclick').replace(/window\.open\("|\"\);/g, '')}`);
        return { name, party, district, pictureUrl };
    }
    return [];
}

(async () => {
    const url = 'https://www.senat.ro/FisaSenatori.aspx';
    let people = [];
    const response = await needle('GET', url);
    const $ = cheerio.load(response.body);
    const rows = $('#senatori tbody tr');

    let personDetailsPromises = [];
    for (rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        if (personDetailsPromises.length === parallelConnections) {
            people = people.concat(await Promise.all(personDetailsPromises)).flat();
            personDetailsPromises = [];
        }
        const row = rows.eq(rowIndex);
        personDetailsPromises.push(getPersonDetails($, row));
    }
    people = people.concat(await Promise.all(personDetailsPromises)).flat();
    fs.writeFileSync(filename, JSON.stringify(people));
    console.log('Senators - Done');
})();
