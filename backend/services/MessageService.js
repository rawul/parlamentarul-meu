const express = require('express');
<<<<<<< HEAD
const messageRoutes = express.Router();

const Msg = require('../models/MessageModel');

const MsgService = {
  addMessage: (req, res) => {
    let msg = new Msg(req.body);
    console.log(msg);
    msg.save()
    .then(msg => {
        res.status(200).json({'message': 'message in added successfully'});
    })
    .catch(err => {
        console.log(err);
        res.status(400).send("unable to save to database")
    });
  }
}

module.exports = MsgService;
=======
const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');


let transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port:587,
  auth: {
    user: 'testmeteowrite@gmail.com',
    pass: 'Meteowrite1.'
  }
}));

const MessageService = {
  sendEmail: async(req, res) => {
      let info =  transporter.sendMail({
        to:   req.body.to,
        cc:   req.body.from, 
        subject: req.body.subject,
        text:   req.body.content
      }).then(
        em => {
          res.status(200);
          res.send("Done");
        }
        ).catch(
          err => console.log(err)
          );

  }
}

module.exports = MessageService;
>>>>>>> bfe8c831fc59a0787049b30bdf7deda59221b87f
