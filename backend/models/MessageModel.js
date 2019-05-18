const mongoose = require("mongoose");
<<<<<<< HEAD
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

=======

const Message = new mongoose.Schema({
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
 });

mongoose.model("Message", Message);
>>>>>>> bfe8c831fc59a0787049b30bdf7deda59221b87f
