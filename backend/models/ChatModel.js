const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Chat = new Schema({
 url: {
    type: String
},
 subject: {
   type: String
 },
 politicianMail: {
   type: String
 },
 userToken: {
   type: String
 }
},{
 collection: 'chat'
});

module.exports = mongoose.model('Chat', Chat);