const express = require('express');
const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
const uuidv4 = require('uuidv4');


let transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'testmeteowrite@gmail.com',
    pass: 'Meteowrite1.'
  },
  tls: {
    rejectUnauthorized: false
  }
}));

const Message = require('../models/MessageModel');
const Chat = require('../models/ChatModel');

const MessageService = {
  sendMessage: async (req, res) => {

    if (req.body.to !== null) {
      let toDeputyMail = transporter.sendMail({
        to: req.body.to,
        cc: req.body.from,
        subject: req.body.subject,
        text: req.body.content
      });
    }

    let token = uuidv4();

    let toSenderMail = transporter.sendMail({
      to: req.body.from,
      subject: req.body.subject,
      text: token
    }).then(async e => {
      let chat = new Chat({ url: token, subject: req.body.subject, politicianMail: req.body.to, userToken: token, messages: [req.body.content], letter: req.body.letter });
      let message = new Message({ from: req.body.from, content: req.body.content, chatURL: token, timestamp: new Date().toISOString() });
      await chat.save();
      await message.save();
      res.status(200).json()
    }).catch(
      err => console.log(err)
    );
  },
  getMessages: async (req, res) => {
    const politicianEmail = req.query.email;
    try {
      const chats = await Chat.find({ politicianMail: politicianEmail }).lean().exec();
      console.log({ chats })
      for (var i = 0; i < chats.length; i++) {
        try {
          const messages = await Message.find({ chatURL: chats[i].url }).lean().exec();
          chats[i].messages = messages;
          console.log({ messages, i })
        } catch (err) {
          res.status(400).json({ message: "Message could not be retrieved" });
        }
      }
      res.status(200).json(chats);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: 'Error retrieving chats' });
    }
  }
}

module.exports = MessageService;
