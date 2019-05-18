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
<<<<<<< HEAD
},{
  collection: 'senators'
});
=======
  county: {
    type: String
  },
  pictureURL: {
    type: String
  }
}, {
    collection: 'senators'
  });
>>>>>>> bfe8c831fc59a0787049b30bdf7deda59221b87f

module.exports = mongoose.model('Senator', Senator);