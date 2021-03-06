const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

let Deputy = new Schema({
  name: {
    type: String,
    index: true
  },
  party: {
    type: String
  },
  address: {
    type: String
  },
  county: {
    type: String
  },
  announcement: {
    type: String
  },
  pictureUrl: {
    type: String
  },
  email: {
    type: String,
    require: true
  },
  wealthDeclaration: {
    type: String
  },
  influence: {
    type: Number
  },
  luariDeCuvant: {
    total: {
      type: Number
    },
    sedinte: {
      type: Number
    }
  },
  motiuni: {
    type: Number
  },
  declaratiiPolitice: {
    type: Number
  },
  propuneriLegislative: {
    total: {
      type: Number
    },
    promulgate: {
      type: Number
    }
  },
  intrebariSiInterpelari: {
    type: Number
  },
  propuneriDeHotarare: {
    type: Number
  }
}, {
    collection: 'deputies'
  });

module.exports = mongoose.model('Deputy', Deputy);