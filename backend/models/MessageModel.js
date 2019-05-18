const mongoose = require("mongoose");

const Message = new mongoose.Schema({
 from: {
   type: String
 },
 content: {
  type: String
 },
chatURL: {
  type: String
 },
 timestamp: {
     type: String
 }
}, {
  collection: "messages"
});

module.exports = mongoose.model("Message", Message);
