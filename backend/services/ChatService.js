const express = require('express');
const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
const uuidv4 = require('uuidv4');
var mongoose = require('mongoose');

const Message = require('../models/MessageModel');
const Chat = require('../models/ChatModel');
const Deputy = require('../models/DeputyModel');
const Senator = require('../models/SenatorModel');
const User = require('../models/UserModel');

const ChatService = {
  sendUserMessage: async (req, res) => {
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
  },
  sendPoliticianMessage: async (req, res) => {
    const token = req.headers['authorization'];
    let user = await User.findOne({ token: token }).lean().exec();
    if (user === null) {
      res.status(404).json();
    } else {
      let chat = await Chat.findById(req.body.chatId).lean().exec();
      if (chat === null) {
        res.status(404).json({ "chat": "not found" });
      } else {

        let message = new Message({ from: req.body.from, content: req.body.content, chatURL: chat.url, timestamp: new Date().toISOString() });

        message.save().then(msg => {
          res.status(201).json();
        }).catch(err => {
          console.log(err);
          res.status(400).json();
        });
      }
    }
  },
  getChatByToken: async (req, res) => {
    console.log(req.user);
    const token = req.params.token;
    try {
      let chat = await Chat.findOne({ userToken: token }).lean().exec();
      let messages = await Message.find({ chatURL: token }).lean().exec();
      chat.messages = messages;
      res.status(200).json(chat);
    } catch (err) {
      // console.log(err);
      res.status(404).json();
    }
  }
}

module.exports = ChatService;
