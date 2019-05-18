const express = require('express');
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