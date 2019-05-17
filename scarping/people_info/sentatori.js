const cheerio = require('cheerio')
const fs = require('fs');
const path = require('path');
const needle = require('needle');

const filename = path.join(__dirname, 'dump/senatori.json');
const url = 'https://www.senat.ro/FisaSenatori.aspx';
(async () => {
    const people = [];
    const response = await needle('GET', url);
    const $ = cheerio.load(response.body);
    $('#senatori tbody tr')
        .each((i, row) => {
            const name = $(row).find('td').eq(1).text().replace(/(^[\s\r\t]+|[\s\r\t]+$)/gm, '');
            const district = $(row).find('td').eq(2).text().replace(/(^[\s\r\t]+|[\s\r\t]+$)/gm, '');
            const party = $(row).find('td').eq(5).text().replace(/(^[\s\r\t]+|[\s\r\t]+$)/gm, '');
            if (district && party && name) {
                people.push({ name, party, district });
            }
        }, [])

    fs.writeFileSync(filename, JSON.stringify(people));
    console.log('Senatori - Done');
})();
