const mongoose = require("mongoose");

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
   }
 });

module.exports = mongoose.model("Message", Message);
