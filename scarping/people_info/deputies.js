const cheerio = require('cheerio')
const fs = require('fs');
const path = require('path');
const needle = require('needle');
const removeAccents = require('remove-accents');
const { featureScalingNormalize } = require('../utils');

const filename = path.join(__dirname, 'dump/deputies.json');
const domain = 'http://www.cdep.ro';
const parallelConnections = 100;
const politicianType = 'deputy';

const getPersonDetails = async ($, row) => {
    const name = $(row).find('td:nth-child(2)').text().replace(/(^[\s\r\t]+|[\s\r\t]+$)/gm, '');
    const party = $(row).find('td:nth-child(3)').text().replace(/(^[\s\r\t]+|[\s\r\t]+$)/gm, '');
    const email = $(row).find('td:nth-child(4) a').text().replace(/(^[\s\r\t]+|[\s\r\t]+$)/gm, '');
    const address = $(row).find('td:nth-child(4)').text().replace(email, '').replace(/(^[\s\r\t]+|[\s\r\t]+$)/gm, '');

    if (name && party && address) {
        console.log(`${domain}${$(row).find('a').attr('href')}`)
        const personData = await getPersonData(`${domain}${$(row).find('a').attr('href')}`);
        return { name, party, email, address, ...personData, politicianType, normalizedName: removeAccents(name).toLowerCase() };
    }
    return [];
}

const getPersonData = async (personLink) => {
    console.log('getting data for', personLink);
    let response = await needle('GET', personLink);
    let $ = cheerio.load(response.body);
    const relativeLink = $('.profile-pic-dep a').attr('href');
    const activityLength = $('.boxStiri > div');
    const activity = activityLength.eq(activityLength.length - 2).find('table [valign="top"]').map(function () { return removeAccents($(this).text()).toLowerCase() }).toArray();
    const activities = activity.reduce((acc, el, i) => {

        const luariDeCuvantMatches = el.match(/luari de cuvant:(\d+) \(in (\d+) sedinte\)/);
        const declaratiiPoliticeMatches = el.match(/declaratii politice depuse in scris:\s*(\d+)/);
        const propuneriLegislativeMatches = el.match(/propuneri legislative initiate: (\d+), din care (\d+) promulgate legi/);
        const propuneriDeHotarareMatches = el.match(/proiecte de hotarare initiate:(\d+)/);
        const intrebariSiInterpelariMatches = el.match(/intrebari si interpelari: (\d+)/);
        const motiuniMatches = /motiuni: (\d+)/;

        if (luariDeCuvantMatches) {
            return {
                ...acc, ...{
                    luariDeCuvant: {
                        total: parseInt(luariDeCuvantMatches[1]) || 0,
                        sedinte: parseInt(luariDeCuvantMatches[2]) || 0,
                        ratio: ((parseInt(luariDeCuvantMatches[2]) || 0) / (parseInt(luariDeCuvantMatches[1]) || 0)) || 0
                    }
                }
            }
        } else if (declaratiiPoliticeMatches) {
            return { ...acc, ...{ declaratiiPolitice: parseInt(declaratiiPoliticeMatches[1]) || 0 } }
        } else if (propuneriLegislativeMatches) {
            return {
                ...acc, ...{
                    propuneriLegislative: {
                        total: parseInt(propuneriLegislativeMatches[1]) || 0,
                        promulgate: parseInt(propuneriLegislativeMatches[2]) || 0,
                        ratio: ((parseInt(propuneriLegislativeMatches[2]) || 0) / (parseInt(propuneriLegislativeMatches[1]) || 0)) || 0
                    }
                }
            }
        } else if (propuneriDeHotarareMatches) {
            return { ...acc, ...{ propuneriDeHotarare: parseInt(propuneriDeHotarareMatches[1]) || 0 } }
        } else if (intrebariSiInterpelariMatches) {
            return { ...acc, ...{ intrebariSiInterpelari: parseInt(intrebariSiInterpelariMatches[1]) || 0 } }
        } else if (motiuniMatches) {
            return { ...acc, ...{ motiuni: parseInt(motiuniMatches[1]) || 0 } }
        }

        return { ...acc, [i]: el.match(luariDeCuvantMatches) }
    }, {
            luariDeCuvant: { total: 0, sedinte: 0, ratio: 0 },
            declaratiiPolitice: 0,
            propuneriLegislative: { total: 0, promulgate: 0, ratio: 0 },
            propuneriDeHotarare: 0,
            intrebariSiInterpelari: 0
        });
    const wealthDeclarationLink = `${personLink}&pag=5`;
    response = await needle('GET', wealthDeclarationLink);
    $ = cheerio.load(response.body);
    const wealthDeclaration = `${domain}${$('[target="PDF"]').attr('href')}`
    return { pictureUrl: `${domain}${relativeLink}`, activity: activities, wealthDeclaration };
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
    return people.sort((p1, p2) => p2.score - p1.score);
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
            const county = removeAccents($(row).find('td').eq(2).text().toLowerCase().replace(/^\d+\s+\/\s+|\s/gm, '')) || null;
            if (name) {
                people.push({ name, county })
            }
        })
    return people;
}

(async () => {
    const people = await getGeneralPeopleInformation();
    const peopleCounties = await getPeopleCountyMatch();
    peopleCounties
        .forEach((pc) => {
            const person = people.find(p => p.name === pc.name);
            if (person) {
                person.county = pc.county;
            } else {
                console.log({ person, pc })
            }
        })

    const minMaxValues = {
        luariDeCuvant: {
            total: { min: Math.min(...people.map(p => p.activity.luariDeCuvant.total)), max: Math.max(...people.map(p => p.activity.luariDeCuvant.total)) },
            sedinte: { min: Math.min(...people.map(p => p.activity.luariDeCuvant.sedinte)), max: Math.max(...people.map(p => p.activity.luariDeCuvant.sedinte)) },
            ratio: { min: Math.min(...people.map(p => p.activity.luariDeCuvant.ratio)), max: Math.max(...people.map(p => p.activity.luariDeCuvant.ratio)) }
        },
        declaratiiPolitice: { min: Math.min(...people.map(p => p.activity.declaratiiPolitice)), max: Math.max(...people.map(p => p.activity.declaratiiPolitice)) },
        propuneriLegislative: {
            total: { min: Math.min(...people.map(p => p.activity.propuneriLegislative.total)), max: Math.max(...people.map(p => p.activity.propuneriLegislative.total)) },
            promulgate: { min: Math.min(...people.map(p => p.activity.propuneriLegislative.promulgate)), max: Math.max(...people.map(p => p.activity.propuneriLegislative.promulgate)) },
            ratio: { min: Math.min(...people.map(p => p.activity.propuneriLegislative.ratio)), max: Math.max(...people.map(p => p.activity.propuneriLegislative.ratio)) }
        },
        propuneriDeHotarare: { min: Math.min(...people.map(p => p.activity.propuneriDeHotarare)), max: Math.max(...people.map(p => p.activity.propuneriDeHotarare)) },
        intrebariSiInterpelari: { min: Math.min(...people.map(p => p.activity.intrebariSiInterpelari)), max: Math.max(...people.map(p => p.activity.intrebariSiInterpelari)) },
    }

    fs.writeFileSync(filename, JSON.stringify(
        people
            .map((p) => {
                const { activity } = p;
                const influence =
                    featureScalingNormalize(activity.luariDeCuvant.ratio, minMaxValues.luariDeCuvant.ratio) * 0.05 +
                    featureScalingNormalize(activity.declaratiiPolitice, minMaxValues.declaratiiPolitice) * 0.05 +
                    featureScalingNormalize(activity.propuneriLegislative.promulgate, minMaxValues.propuneriLegislative.promulgate) * 0.3 +
                    featureScalingNormalize(activity.propuneriLegislative.ratio, minMaxValues.propuneriLegislative.ratio) * 0.4 +
                    featureScalingNormalize(activity.intrebariSiInterpelari, minMaxValues.intrebariSiInterpelari) * 0.1 +
                    featureScalingNormalize(activity.propuneriDeHotarare, minMaxValues.propuneriDeHotarare) * 0.1;
                p.influence = influence || 0;
                return p;
            })

            .sort((a, b) => b.influence - a.influence)
    ));
    console.log('Deputies - Done');
})();

