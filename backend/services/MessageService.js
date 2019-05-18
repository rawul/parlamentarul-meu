const express = require('express');
const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
const uuidv4 = require('uuidv4');
const fs = require('fs');
const pdf = require('html-pdf');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const filter = require('./SpamFilter')

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

function exportAsPdf (mail, message) {
  const options = { format: 'A4'}
  const dom = JSDOM.fromFile('./services/test.html', options).then(d => {
    d.window.document.getElementById("email-from").innerHTML = mail;
    d.window.document.getElementById("message").innerHTML = message;
    pdf.create(d.serialize(), options).toFile('./services/test.pdf', (err, res) => {
    if (err) return console.log(err);
      console.log(res);
  });
  });
}


const Message = require('../models/MessageModel');
const Chat = require('../models/ChatModel');

const MessageService = {
  sendMessage: async (req, res) => {

    if (req.body.to !== null) {
      if(req.body.letter){
        exportAsPdf(req.body.to, req.body.content);
        let toDeputyMail = transporter.sendMail({
          to: req.body.to,
          cc: req.body.from,
          subject: req.body.subject,
          text: req.body.content,
          attachments: [
            {
             path: './services/test.pdf'
            }
         ]
        });
      }
      else {
        let toDeputyMail = transporter.sendMail({
        to: req.body.to,
        cc: req.body.from,
        subject: req.body.subject,
        text: req.body.content,
      });
      }
    }

    let token = uuidv4();

    let toSenderMail = transporter.sendMail({
      to: req.body.from,
      subject: req.body.subject,
      html: `<p>Email-ul catre parlamentar a fost trimis cu success. Intra pe urmatorul link daca doresti sa continui discutia cu parlamentarul: <strong>http://localhost:4200/chat/${token}</strong></p>`
    }).then(async e => {
      let chat = new Chat({ url: token, subject: req.body.subject, politicianMail: req.body.to, userToken: token, messages: [req.body.content], letter: req.body.letter });
      if(filter.isSpam(req.body.content)){
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
