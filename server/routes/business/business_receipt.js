const { check, validationResult }   = require('express-validator/check');
const { matchedData, sanitize }     = require('express-validator/filter');

const passport                      = require('passport');
const LocalStrategy                 = require('passport-local').Strategy;

const BusinessModel                 = require('../../models/BusinessRegistrationSchema');
const UserModel                     = require('../../models/UserRegistrationSchema');
const sharedFunctions               = require('../sharedFunctions.js');
const constants                     = require('../../constants.js');

const mongoose                      = require('mongoose');

module.exports = (app) => {

  function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    }
  }

  /*

    RECEIPT (GET TABLE / ADD TABLE / REMOVE TABLE / ADD ITEM TO TABLE / REMOVE ITEM FROM TABLE / CHECKOUT)
  
  */

  // Get categories will also give us items
  app.get('/business/get-receipt-items', isAuthenticated, function(req, res) {
    // User is auth, so we'll get the business via his business id
    UserModel.findOne({'email' : req.user.email}, 'business_id', (err, person) => {
      if(err)
         return req.status(500).send({state : constants.USER_NOT_FOUND})
      
    })
  });

  app.post('/business/add-table', isAuthenticated, function(req, res) {
    // User is auth, so we'll get the business via his business id
    UserModel.findOne({'email' : req.user.email}, 'business_id', (err, person) => {
      if(err)
         return req.status(500).send({state : constants.USER_NOT_FOUND})
      
    })
  });

  app.post('/business/remove-table', isAuthenticated, function(req, res) {
    // User is auth, so we'll get the business via his business id
    UserModel.findOne({'email' : req.user.email}, 'business_id', (err, person) => {
      if(err)
         return req.status(500).send({state : constants.USER_NOT_FOUND})
      
    })
  });

  app.post('/business/add-table-item', isAuthenticated, function(req, res) {
    // User is auth, so we'll get the business via his business id
    UserModel.findOne({'email' : req.user.email}, 'business_id', (err, person) => {
      if(err)
         return req.status(500).send({state : constants.USER_NOT_FOUND})
      
    })
  });
  
  app.post('/business/remove-table-item', isAuthenticated, function(req, res) {
    // User is auth, so we'll get the business via his business id
    UserModel.findOne({'email' : req.user.email}, 'business_id', (err, person) => {
      if(err)
         return req.status(500).send({state : constants.USER_NOT_FOUND})
      
    })
  });

  app.post('/business/checkout-table', isAuthenticated, function(req, res) {
    // User is auth, so we'll get the business via his business id
    UserModel.findOne({'email' : req.user.email}, 'business_id', (err, person) => {
      if(err)
         return req.status(500).send({state : constants.USER_NOT_FOUND})
      
    })
  });

};
