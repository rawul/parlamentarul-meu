const express = require('express');
const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
const uuidv4 = require('uuidv4');

const Message = require('../models/MessageModel');
const Chat = require('../models/ChatModel');

let baseUrl = "localhost:4000/api/v1/chat/"

const ChatService = {
  sendMessage: async (req, res) => {
    Chat.find(function (err, chat) {
        if (err) {
          console.log(err);
        }
        else {
            console.log(chat);
            if(chat == "[]")
                res.status(404).json();
            else{
                baseUrl += req.params.token;
                let message = new Message({from: req.body.from, content: req.body.content, chatURL: baseUrl, timestamp: new Date().toISOString()});
                message.save().then((err) => {
                if(err){
                    console.log(err);
                    res.status(400).json();
                }
                else
                    res.status(200).json();
                })
            }
        }
      });
    }
}

module.exports = ChatService;
