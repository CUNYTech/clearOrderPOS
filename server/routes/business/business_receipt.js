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
  app.get('/business/get-tables', isAuthenticated, function(req, res) {
    // User is auth, so we'll get the business via his business id
    UserModel.findOne({'email' : req.user.email}, 'business_id', (err, person) => {
      if(err)
         return req.status(500).send({state : constants.USER_NOT_FOUND})
         
      BusinessModel.find().where('business_id').equals(person.business_id)
      .select('business_tables')
      .find(function(err, array){
        if(err)
          return req.status(500).send({state : constants.COMPANY_NOT_FOUND})
        res.status(200).send(array)
      });
      
    })
  });

  app.post('/business/add-table', isAuthenticated, [
    check('table_name')
      .trim()
      .isLength({min : 1})
      .withMessage("A table name must be provided"),
  ], 
  function (req, res, next) {
    const validationErrors = validationResult(req)
    // Validate that the user has given us some input
    if(!validationErrors.isEmpty())
      return res.status(400).send({state : constants.VALID_NOT_APPROVED ,message: validationErrors.mapped()})

    // User is auth, so we'll get the business via his business id
    UserModel.findOne({'email' : req.user.email}, 'business_id', (err, person) => {
      if(err)
         return req.status(500).send({state : constants.USER_NOT_FOUND})

      // We're looking for a specific business id and adding in a new category
      BusinessModel.findOne({'business_tables.table_name' : req.body.table_name}, (error, result) => {
        if(!result)
        {
          BusinessModel.findOneAndUpdate({'business_id' : person.business_id},
          {
            $push : {
              business_tables : {"table_name": req.body.table_name}
            } 
          },{upsert:true, new : true}, (bError, result) => {
            if(bError)
              return res.status(500).send({message : 'There was an error confirming the business',  state : constants.BUSINESS_NOT_FOUND})
  
            return res.status(200).send({state : constants.SUCCESS, message : req.body.table_name + ' has been added'})
          })
        } else {
          return res.status(500).send({message : 'Table is already in use'});
        }
      })
      
    })
  });

  app.post('/business/remove-table', isAuthenticated, function(req, res) {
    // User is auth, so we'll get the business via his business id
    UserModel.findOne({'email' : req.user.email}, 'business_id', (err, person) => {
      if(err)
         return req.status(500).send({state : constants.USER_NOT_FOUND})
      BusinessModel.findOneAndUpdate({'business_id' : person.business_id},
      {
        $pull : {
          business_tables : {"table_name": req.body.current_table }
        } 
      }, { safe: true, upsert: true }, (bError, result) => {
        if(bError)
          return res.status(500).send({message : 'There was an error confirming the business', state : constants.BUSINESS_NOT_FOUND})

        return res.status(200).send({state : constants.SUCCESS})
      })
    })
  });

  app.post('/business/add-table-item', isAuthenticated, function(req, res) {
    // User is auth, so we'll get the business via his business id
    UserModel.findOne({'email' : req.user.email}, 'business_id', (err, person) => {
      if(err)
         return req.status(500).send({state : constants.USER_NOT_FOUND})
      BusinessModel.update({'business_id' : person.business_id, 'business_tables.table_name' : req.body.current_table},
      {
        $push : {
          'business_tables.$.items' :  {"name": req.body.item_name, "price": req.body.item_price, amount : 1}
        } 
      },{upsert:true, new : true}, (bError, result) => {
        if(bError)
          return res.status(500).send({message : 'There was an error confirming the business', state : constants.BUSINESS_NOT_FOUND})

        return res.status(200).send({state : constants.SUCCESS})
      })
    })
  });
  
  app.post('/business/remove-table-item', isAuthenticated, function(req, res) {
    // User is auth, so we'll get the business via his business id
    UserModel.findOne({'email' : req.user.email}, 'business_id', (err, person) => {
      if(err)
         return req.status(500).send({state : constants.USER_NOT_FOUND})
      BusinessModel.updateOne({'business_id' : person.business_id, 'business_tables.table_name' : req.body.current_table},
      {
        $pull : {
          'business_tables.$.items' : {"name": req.body.item_name }
        } 
      }, { safe: true, upsert: true, multi: false }, (bError, result) => {
        if(bError)
          return res.status(500).send({message : 'There was an error confirming the business', state : constants.BUSINESS_NOT_FOUND})

        return res.status(200).send({state : constants.SUCCESS})
      }
    )
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
