const express = require('express');
const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
const uuidv4 = require('uuidv4');

const Message = require('../models/MessageModel');
const Chat = require('../models/ChatModel');

const ChatService = {
  sendMessage: async (req, res) => {
    Chat.find(function (err, chat) {
      if (err) {
        console.log(err);
      }
      else {
        if (chat == "[]")
          res.status(200).json();
        else {
          let message = new Message({ from: req.body.from, content: req.body.content, chatURL: req.params.token, timestamp: new Date().toISOString() });
          message.save()
            .then(() => {
              res.status(200).json();
            })
            .catch((err) => {
              console.log({ err });
              res.status(400).json();
            })
        }
      }
    });
  }
}

module.exports = ChatService;
