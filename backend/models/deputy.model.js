const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Deputy = new Schema({
  name: String,
  party: String,
  address: String,
  email: String
},{
  collection: 'persons'
});

module.exports = mongoose.model('Deputy', Deputy);