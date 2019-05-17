const express = require('express');
const senatorRoutes = express.Router();

let Senator = require('../models/senator.model');

senatorRoutes.route('/add').post(function (req, res) {
  let senator = new Senator(req.body);
  senator.save()
    .then(senator => {
      res.status(200).json({'deputy': 'deputy in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

senatorRoutes.route('/').get(function (req, res) {
    Senator.find(function(err, senators){
    if(err){
      console.log(err);
    }
    else {
      res.json(senators);
    }
  });
});

module.exports = senatorRoutes;