const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");
const passportLocalMongoose = require("passport-local-mongoose");

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
    type: String,
    require: true
  },
},{
  collection: 'persons'
});


// Deputy.plugin(passportLocalMongoose);
// Deputy.plugin(findOrCreate);
module.exports = mongoose.model('Deputy', Deputy);