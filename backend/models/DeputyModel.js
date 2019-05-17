const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Deputy = new Schema({
  name: {
    type: String
  },
  party: {
    type: String
  },
  email: {
    type: String
  },
  cabinetAddress: {
    type: String
  },
},{
  collection: 'persons'
});

module.exports = mongoose.model('Deputy', Deputy);