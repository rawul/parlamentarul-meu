const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Senator = new Schema({
  name: {
    type: String
  },
  party: {
    type: String
  },
  district: {
    type: String
  },
},{
  collection: 'senators'
});

module.exports = mongoose.model('Senator', Senator);