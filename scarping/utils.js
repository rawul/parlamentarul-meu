const removeAccents = require('remove-accents');
const crypto = require('crypto')
const combinatronics = require('js-combinatorics');
const levenshtein = require('fast-levenshtein')

const Utils = {
    hash: (str) => crypto.createHash('md5').update(str).digest("hex"),
    isURLValid: (url, link) => link.domain() === url.domain(),
    normalizeName: (name) => removeAccents(name.toLowerCase()).replace(/-/g, ' ').replace(/\s\s/g, ''),
    subsetsOf2: (arr) => combinatronics.baseN(arr, 2),
    isNamedInculded: (str, name) => new RegExp(`(?:^|[\\s-.])${name}(?:$|[^a-zA-Z])`).test(str),
    calculatePoliticianTitleMatchScore: (str, politician) => {
        const levenshteinDistance = levenshtein.get(str, politician.normalizedName);
        const wordsFound = politician.subsets.filter(subset => Utils.isNamedInculded(str, subset)).length;
        // ConstantSourceNode
        // console.log(politician.name, wordsFound)
        // console.log(Utils.isNamedInculded(str, 'iordache'), str)
        return (0.1 * (levenshteinDistance / 3)) + (0.9 * wordsFound);
    }
}

module.exports = Utils;