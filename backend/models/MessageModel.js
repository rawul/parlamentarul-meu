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
   },
   letter: {
       type: Boolean
   }
 });

mongoose.model("Message", Message);