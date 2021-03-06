const express = require('express');
const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
const uuidv4 = require('uuidv4');
const fs = require('fs');
const pdf = require('html-pdf');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const filter = require('./SpamFilter')

const User = require('../models/UserModel');

let transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'xboyotrava@gmail.com',
    pass: 'lfiedlrqafdetaqe'
  },
  tls: {
    rejectUnauthorized: false
  }
}));

const exportAsPdf = async (mail, message) => {
  return new Promise(async (resolve, reject) => {
    const options = { format: 'A4' }
    const dom = await JSDOM.fromFile('./services/test.html', options);
    dom.window.document.getElementById("email-from").innerHTML = mail;
    dom.window.document.getElementById("message").innerHTML = message;
    pdf.create(dom.serialize(), options).toFile('./services/test.pdf', (err, res) => {
      resolve()
      if (err) return console.log(err);
    });
  })
}


const Message = require('../models/MessageModel');
const Chat = require('../models/ChatModel');

const MessageService = {
  sendMessage: async (req, res) => {
    if (req.body.to !== null) {
      if (req.body.letter) {
        await exportAsPdf(req.body.from, req.body.content);
        console.log('after export')
        let toDeputyMail = transporter.sendMail({
          to: 'darius.costolas@student.upt.ro',
          cc: req.body.from,
          subject: 'O noua scrisoare a fost generata',
          text: req.body.content,
          attachments: [
            {
              path: './services/test.pdf'
            }
          ]
        });
      }
    }

    let token = uuidv4();

    let toSenderMail = transporter.sendMail({
      to: req.body.from,
      subject: 'Confirmare trimitere mesaj parlamentar',
      html: `<p>Email-ul catre parlamentar a fost trimis cu success. Intra pe urmatorul link daca doresti sa continui discutia cu parlamentarul: <strong>http://localhost:4200/chat/${token}</strong></p>`
    }).then(async e => {
      let chat = new Chat({ url: token, subject: req.body.subject, politicianMail: req.body.to, userToken: token, messages: [req.body.content], letter: req.body.letter });
      if (filter.isSpam(req.body.content)) {
        let spamMail = transporter.sendMail({
          to: req.body.from,
          subject: "Mesaj netrimis",
          html: `<p>Mesajul dumneavoastra a fost considerat ca fiind neadecvat. Astfel, nu a fost trimis parlamentarului.</p>`,
        });
        res.status(200).json();
      }
      else {
        let message = new Message({ from: req.body.from, content: req.body.content, chatURL: token, timestamp: new Date().toISOString() });
        await chat.save();
        await message.save();
        res.status(200).json()
      }
    }).catch(
      err => console.log(err)
    );
  },
  getMessages: async (req, res) => {
    const politicianEmail = req.query.email;
    try {
      const chats = await Chat.find({ politicianMail: politicianEmail }).lean().exec();
      for (var i = 0; i < chats.length; i++) {
        try {
          const messages = await Message.find({ chatURL: chats[i].url }).lean().exec();
          chats[i].messages = messages;
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
