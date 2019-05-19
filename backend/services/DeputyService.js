const express = require('express');
const deputyRoutes = express.Router();

let Deputy = require('../models/DeputyModel');
let Msg = require('../models/MessageModel');

const DeputyService = {
  addDeputy: async (req, res) => {
    let deputy = new Deputy(req.body);
    deputy.save()
      .then(deputy => {
        res.status(200).json({ 'deputy': 'deputy in added successfully' });
      })
      .catch(err => {
        console.log(err);
        res.status(400).send("unable to save to database")
      });
  },
  getDeputies: async (req, res) => {
    try {
      const page = req.query.page;
      const size = req.query.size;
      const deputies = await Deputy.find({}).skip(parseInt(size * page)).limit(parseInt(size)).lean().exec();
      res.status(200).json(deputies);
    } catch (err) {
      console.log(err);
      res.status(400).json();
    }
  },
  getDeputyById: async (req, res) => {
    console.log(req.params.id);
    Deputy.findById(req.params.id, (error, deputy) => {
      if (error) {
        console.log(error);
        res.status(400);
        res.send(err);
      } else { res.send(deputy); }
    });
  },
  getDeputiesByParty: async (req, res) => {
    let party = req.query.party;
    const page = req.query.page;
    const size = req.query.size;
    console.log(party);
    try {
      let deputies = await Deputy.find({ party }).skip(parseInt(size * page)).limit(parseInt(size)).lean().exec();
      res.status(200).json(deputies);
    } catch (err) {
      console.log(err);
      res.status(400).json();
    }
  },
  getMessages: async (req, res) => {
    let to = req.params.mail;
    Msg.find({ to:to }, (err, messages) => {
      if(err)
      console.log(err);
    else
      res.json(messages);
    });
  }
}

module.exports = DeputyService;