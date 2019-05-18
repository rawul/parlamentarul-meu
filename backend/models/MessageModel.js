const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Msg = new Schema({
    from: {
        type: String
    },
    to: {
        type: String
    },
    subject: {
        type: String
    },
    content: {
        type: String
    },
    letter: {
        type: Boolean
    }
  },{
    collection: 'messages'
  });

  module.exports = mongoose.model("Msg", Msg);

