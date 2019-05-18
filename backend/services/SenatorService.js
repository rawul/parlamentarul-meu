const express = require('express');
const senatorRoutes = express.Router();

let Senator = require('../models/SenatorModel');
let Message = require('../models/MessageModel');

const SenatorService = {
  add: async (req, res) => {
    let senator = new Senator(req.body);
    senator.save()
      .then(senator => {
        res.status(200).json({ 'senator': 'senator in added successfully' });
      })
      .catch(err => {
        console.log(err);
        res.status(400).send("unable to save to database");
      });
  },

  getAll: async (req, res) => {
    try {
      const page = req.query.page;
      const size = req.query.size;
      const senators = await Senator.find({}).skip(parseInt(size * page)).limit(parseInt(size)).lean().exec();
      res.status(200).json(senators);
    } catch (err) {
      console.log(err);
      res.status(400).json();
    }
  },

  getById: async (req, res) => {
    Senator.findById(req.params.id, (err, senator) => {
      if (err)
        console.log(err);
      else
        res.json(senator);
    });
  },

  getByParty: async (req, res) => {
    let party = req.query.party;
    const page = req.query.page;
    const size = req.query.size;
    console.log(party);
    try {
      let senators = await Senator.find({ party }).skip(parseInt(size * page)).limit(parseInt(size)).lean().exec();
      res.status(200).json(senators);
    } catch (err) {
      console.log(err);
      res.status(400).json();
    }
  },
  getByDistrict: async (req, res) => {
    let district = req.query.district;
    const page = req.query.page;
    const size = req.query.size;
    console.log(district);
    try {
      let senators = await Senator.find({ district }).skip(parseInt(size * page)).limit(parseInt(size)).lean().exec();
      res.status(200).json(senators);
    } catch (err) {
      console.log(err);
      res.status(400).json();
    }
  }
}

module.exports = SenatorService;