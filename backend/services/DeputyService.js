const express = require('express');
const deputyRoutes = express.Router();

let Deputy = require('../models/DeputyModel');

const DeputyService = {
  addDeputy: async (req, res) => {
    console.log(req.body);

    let deputy = new Deputy(req.body);
  deputy.save()
    .then(deputy => {
      res.status(200).json({'deputy': 'deputy in added successfully'});
    })
    .catch(err => {
      console.log(err);
    res.status(400).send("unable to save to database")
    });
  },
  getDeputies: async(req, res) => {
    Deputy.find(function(err, deputies){
      if(err){
        console.log(err);
      }
      else {
        res.json(deputies);
      }
    });
  },
  getDeputyById: async (req, res) => {
    console.log(req.params.id);
    Deputy.findById(req.params.id, (error, deputy) => {
      if(error) {
        console.log(error);
        res.status(400);
        res.send(err);
      } else {res.send(deputy);}
    });
  },
  getDeputyByParty: async (req, res) => {
    var p = req.query.party;
    console.log(p);
    Deputy.findOne({party: p} ,(error, deputy) => {
      if(error){
        console.log(error);
        res.status(400);
        res.send(error);
      } else {
        res.send(deputy);
      }
    });
  }
}

module.exports = DeputyService;