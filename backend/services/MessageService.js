const express = require('express');
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