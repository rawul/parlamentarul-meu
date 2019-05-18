const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Message = require('./MessageModel');


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
 },
 messages: {
     type: Array
 },
 letter: {
   type: Boolean
 }
},{
 collection: 'chat'
});

module.exports = mongoose.model('Chat', Chat);