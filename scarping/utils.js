const removeAccents = require('remove-accents');
const crypto = require('crypto')
const combinatronics = require('js-combinatorics');

const Utils = {
    hash: (str) => crypto.createHash('md5').update(str).digest("hex"),
    isURLValid: (url, link) => link.domain() === url.domain(),
    normalizeName: (name) => removeAccents(name.toLowerCase()).replace(/-/g, ' ').replace(/\s\s/g, ''),
    subsetsOf2: (arr) => combinatronics.baseN(arr, 2),
    isNamedInculded: (str, name) => new RegExp(`(?:^|[\\s-.])${name}(?:$|[\\s-.])`).test(str)
}

module.exports = Utils;