const cheerio = require('cheerio')
const fs = require('fs');
const path = require('path');
const needle = require('needle');

const filename = path.join(__dirname, 'dump/deputies.json');
const domain = 'http://www.cdep.ro';
const parallelConnections = 100;

const getPersonDetails = async ($, row) => {
    const name = $(row).find('td:nth-child(2)').text().replace(/(^[\s\r\t]+|[\s\r\t]+$)/gm, '');
    const party = $(row).find('td:nth-child(3)').text().replace(/(^[\s\r\t]+|[\s\r\t]+$)/gm, '');
    const email = $(row).find('td:nth-child(4) a').text().replace(/(^[\s\r\t]+|[\s\r\t]+$)/gm, '');
    const address = $(row).find('td:nth-child(4)').text().replace(email, '').replace(/(^[\s\r\t]+|[\s\r\t]+$)/gm, '');

    if (name && party && address) {
        const pictureUrl = await getPersonPicture(`${domain}${$(row).find('a').attr('href')}`);
        return { name, party, email, address, pictureUrl };
    }
    return [];
}

const getPersonPicture = async (personLink) => {
    console.log('getting picture for', personLink);
    const response = await needle('GET', personLink);
    const $ = cheerio.load(response.body);
    const relativeLink = $('.profile-pic-dep a').attr('href');
    return `${domain}${relativeLink}`;
}

const getGeneralPeopleInformation = async () => {
    const url = 'http://www.cdep.ro/pls/parlam/structura2015.de?par=C';
    let people = [];
    const response = await needle('GET', url);
    const $ = cheerio.load(response.body);
    const rows = $('.grup-parlamentar-list tr');

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

    return people;
}

const getPeopleCountyMatch = async () => {
    const url = 'http://www.cdep.ro/pls/parlam/structura2015.de?idl=1';
    const people = [];
    const response = await needle('GET', url);
    const $ = cheerio.load(response.body);
    $('.grup-parlamentar-list')
        .eq(0)
        .find('tr')
        .each((i, row) => {
            const name = $(row).find('td').eq(1).text()
            const county = $(row).find('td').eq(2).text().toLowerCase().replace(/^\d+\s+\/\s+|\s/gm, '') || null;
            if (name) {
                people.push({ name, county })
            }
        })
    return people;
}

(async () => {
    const people = await getGeneralPeopleInformation();
    const peopleCounties = await getPeopleCountyMatch();
    peopleCounties.forEach((pc) => {
        const person = people.find(p => p.name === pc.name);
        if (person) {
            person.county = pc.county;
        } else {
            console.log({ person, pc })
        }
    })
    fs.writeFileSync(filename, JSON.stringify(people));
    console.log('Deputies - Done');
})();

