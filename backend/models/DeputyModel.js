const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Deputy = new Schema({
  name: {
    type: String
  },
  party: {
    type: String
  },
  address: {
    type: String
  },
  email: {
    type: String
  },
},{
  collection: 'persons'
});

module.exports = mongoose.model('Deputy', Deputy);