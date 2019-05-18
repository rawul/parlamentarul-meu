const cheerio = require('cheerio')
const fs = require('fs');
const path = require('path');
const needle = require('needle');
const removeAccents = require('remove-accents');

(async () => {
    const response = await needle('GET', 'https://www.hotnews.ro/');
    const $ = cheerio.load(response.body);
    console.log($('a').map(function () { return $(this).attr('href') }).get());
})();