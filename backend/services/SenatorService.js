const express = require('express');
const senatorRoutes = express.Router();

let Senator = require('../models/SenatorModel');

const SenatorService = {
  add: async (req, res) => {
    let senator = new Senator(req.body);
    senator.save()
      .then(senator => {
        res.status(200).json({'deputy': 'deputy in added successfully'});
      })
      .catch(err => {
      res.status(400).send("unable to save to database");
      });
    },

  getAll: async (req, res) => {
    Senator.find(function(err, senators){
    if(err){
       console.log(err);
     }
     else {
       res.json(senators);
       }
     });
  },

  getById: async (req, res) => {
    Senator.findById(req.params.id, function(err, senator){
    if(err)
      console.log(err);
    else
      res.json(senator);
    });
  },

  getByParty: async (req, res) => {
    let party = req.params.party;
    Senator.find({ party: party}, function(err, senators){
    if(err)
      console.log(err);
    else
      res.json(senators);
    });
  },

  getByDistrict: async (req, res) => {
    let district = req.params.district;
    Senator.find({ district: district}, function(err, senators){
    if(err)
      console.log(err);
    else
      res.json(senators);
    });
  }
}

module.exports = senatorRoutes;