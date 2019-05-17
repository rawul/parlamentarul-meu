const cheerio = require('cheerio')
const fs = require('fs');
const path = require('path');
const needle = require('needle');

const filename = path.join(__dirname, 'dump/deputati.json');
const url = 'http://www.cdep.ro/pls/parlam/structura2015.de?par=C';
(async () => {
    const people = [];
    const response = await needle('GET', url);
    const $ = cheerio.load(response.body);
    $('.grup-parlamentar-list tr')
        .each((i, row) => {
            const name = $(row).find('td:nth-child(2)').text().replace(/(^[\s\r\t]+|[\s\r\t]+$)/gm, '');
            const party = $(row).find('td:nth-child(3)').text().replace(/(^[\s\r\t]+|[\s\r\t]+$)/gm, '');
            const email = $(row).find('td:nth-child(4) a').text().replace(/(^[\s\r\t]+|[\s\r\t]+$)/gm, '');
            const address = $(row).find('td:nth-child(4)').text().replace(email, '').replace(/(^[\s\r\t]+|[\s\r\t]+$)/gm, '');
            if (name && party && email && address) {
                people.push({ name, party, email, address });
            }
        }, [])

    fs.writeFileSync(filename, JSON.stringify(people));
    console.log('Deputati - Done');
})();
