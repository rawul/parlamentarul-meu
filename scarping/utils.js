const removeAccents = require('remove-accents');
const crypto = require('crypto')
const combinatronics = require('js-combinatorics');

const Utils = {
    hash: (str) => crypto.createHash('md5').update('some_string').digest("hex"),
    isURLValid: (link) => link.startsWith(url),
    normalizeName: (name) => removeAccents(name.toLowerCase()).replace(/-/g, ' ').replace(/\s\s/g, ''),
    subsetsOf2: (arr) => combinatronics.baseN(arr, 2)
}

module.exports = Utils;