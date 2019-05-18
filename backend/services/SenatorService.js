const express = require('express');
const senatorRoutes = express.Router();

let Senator = require('../models/SenatorModel');
let Message = require('../models/MessageModel');

const SenatorService = {
  add: async (req, res) => {
    let senator = new Senator(req.body);
    senator.save()
      .then(senator => {
        res.status(200).json({'senator': 'senator in added successfully'});
      })
      .catch(err => {
        console.log(err);
        res.status(400).send("unable to save to database");
      });
    },

  getAll: async (req, res) => {
    Senator.find((err, senators) => {
    if(err){
       console.log(err);
     }
     else {
       res.json(senators);
       }
     });
  },

  getById: async (req, res) => {
    Senator.findById(req.params.id, (err, senator) => {
    if(err)
      console.log(err);
    else
      res.json(senator);
    });
  },

  getByParty: async (req, res) => {
    let party = req.query.party;
    Senator.find({ party: party}, (err, senators) => {
    if(err)
      console.log(err);
    else
      res.json(senators);
    });
  },

  getByDistrict: async (req, res) => {
    let district = req.query.district;
    Senator.find({ district: district}, (err, senators) => {
    if(err)
      console.log(err);
    else
      res.json(senators);
    });
  }
}

module.exports = SenatorService;