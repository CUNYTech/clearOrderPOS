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

    CATEGORIES (ADDING / REMOVING / RECEIVING )
  
  */

  // Get categories will also give us items
  app.get('/business/get-categories', isAuthenticated, function(req, res) {
    // User is auth, so we'll get the business via his business id
    UserModel.findOne({'email' : req.user.email}, 'business_id', (err, person) => {
      if(err)
         return req.status(500).send({state : constants.USER_NOT_FOUND})
      // Find business id, then select business items - that contains the categories and items
      BusinessModel.find().where('business_id').equals(person.business_id)
        .select('business_items')
        .find(function(err, array){
          if(err)
            return req.status(500).send({state : constants.COMPANY_NOT_FOUND})
          res.status(200).send(array)
        });
    })
  });

  // Adding a category will get the user business and add a category based on it
  app.post('/business/add_category', isAuthenticated, [
    check('category_name')
      .trim()
      .isLength({min : 1})
      .withMessage("A name must be provided")
  ], 
  function (req, res, next) {
    const validationErrors = validationResult(req)
    // Validate that the user has given us some input
    if(!validationErrors.isEmpty())
      return res.status(400).send({state : constants.VALID_NOT_APPROVED ,message: validationErrors.mapped()})
    // As before, we'll get the business id through the user
    UserModel.findOne({'email' : req.user.email}, 'business_id', (err, person) => {
      if(err)
         return req.status(500).send({state : constants.USER_NOT_FOUND})
      // We're looking for a specific business id and adding in a new category
      BusinessModel.findOne({'business_items.category' : req.body.category_name}, (error, result) => {
        if(!result)
        {
          BusinessModel.findOneAndUpdate({'business_id' : person.business_id},
          {
            $push : {
              business_items : {"category": req.body.category_name}
            } 
          },{upsert:true, new : true}, (bError, result) => {
            if(bError)
              return res.status(500).send({message : 'There was an error confirming the business',  state : constants.BUSINESS_NOT_FOUND})
  
            return res.status(200).send({state : constants.SUCCESS, message : req.body.category_name + ' has been added'})
          })
        } else {
          return res.status(500).send({message : 'Category is already in use'});
        }
      })

    })
  });

  // Removing a category will get the user business and remove a category
  app.post('/business/remove_category', function (req, res, next) {
    // As before, we'll get the business id through the user
    UserModel.findOne({'email' : req.user.email}, 'business_id', (err, person) => {
      if(err)
         return req.status(500).send({state : constants.USER_NOT_FOUND})
      // Now we want to delete a specific category entry, and we're provided with the category name
      BusinessModel.findOneAndUpdate({'business_id' : person.business_id},
        {
          $pull : {
            business_items : {"category": req.body.category_name }
          } 
        }, { safe: true, upsert: true }, (bError, result) => {
          if(bError)
            return res.status(500).send({message : 'There was an error confirming the business', state : constants.BUSINESS_NOT_FOUND})

          return res.status(200).send({state : constants.SUCCESS})
        }
      )
    })
  });

  /*

    ITEMS (ADDING / REMOVING )
  
  */
    app.post('/business/add_item', isAuthenticated, [
    check('item_category')
      .trim()
      .isLength({min : 1})
      .withMessage("A category must be provided"),
    check('item_name')
      .trim()
      .isLength({min : 1})
      .withMessage("An item name must be provided"),
    check('item_price')
      .trim()
      .isLength({min : 1})
      .withMessage("An item price must be provided")
  ], 
  function (req, res, next) {
    const validationErrors = validationResult(req)
    // Validate that the user has given us some input
    if(!validationErrors.isEmpty())
      return res.status(400).send({state : constants.VALID_NOT_APPROVED ,message: validationErrors.mapped()})
    // As before, we'll get the business id through the user
    UserModel.findOne({'email' : req.user.email}, 'business_id', (err, person) => {
      if(err)
         return req.status(500).send({state : constants.USER_NOT_FOUND})
      // We're looking for a specific business id and adding in a new item
      BusinessModel.update({'business_id' : person.business_id, 'business_items.category' : req.body.item_category},
        {
          $push : {
            'business_items.$.items' :  {"name": req.body.item_name, "price": req.body.item_price}
          } 
        },{upsert:true, new : true}, (bError, result) => {
          if(bError)
            return res.status(500).send({message : 'There was an error confirming the business', state : constants.BUSINESS_NOT_FOUND})

          return res.status(200).send({message : req.body.item_name + ' has been added', state : constants.SUCCESS})
        }
      )
    })
  });

  app.post('/business/remove_item', function (req, res, next) {
    // As before, we'll get the business id through the user
    UserModel.findOne({'email' : req.user.email}, 'business_id', (err, person) => {
      if(err)
         return req.status(500).send({state : constants.USER_NOT_FOUND})
      // Now we want to delete a specific item entry, and we're provided with the category name
      BusinessModel.update({'business_id' : person.business_id, 'business_items.category' : req.body.item_category},
        {
          $pull : {
            'business_items.$.items' : {"name": req.body.item_name }
          } 
        }, { safe: true, upsert: true }, (bError, result) => {
          if(bError)
            return res.status(500).send({message : 'There was an error confirming the business', state : constants.BUSINESS_NOT_FOUND})

          return res.status(200).send({state : constants.SUCCESS})
        }
      )
    })
  });

    /*

    GET BUSINESSES

  */

 app.get('/business/get-businesses', isAuthenticated, function(req, res) {
  // User is auth, so we'll get the business via his business id
  UserModel.findOne({'email' : req.user.email}, '-_id business_id', (err, business) => {
    if(err)
       return req.status(500).send({state : constants.USER_NOT_FOUND})
    // Find business id, then select business items - that contains the categories and items
    res.status(200).send(business)
    })
  });

  /*

    REGISTERING A BUSINESS
  
  */

  app.post('/business/register', [
    check('fname')
        .trim()
        .isLength({ min: 1 })
        .withMessage('First Name is required'),

    check('lname')
        .trim()
        .isLength({min: 1})
        .withMessage('Last Name is required'),

    check('business_id')
        .trim()
        .isLength({min: 1})
        .withMessage('Company Code is required'),

    check('email')
        .trim()
        .isEmail().withMessage('Must be a valid email'),

    check('business_address')
        .trim()
        .isLength({min: 1})
        .withMessage('Company Address is required'),

    check('business_name')
        .trim()
        .isLength({min: 1})
        .withMessage('Company Name is required'),

    check('business_phone')
        .trim()
        .isLength({min: 1})
        .withMessage('Company Phone Number is required'),

    check("password", "Password must be 4 characters or more")
        .trim()
        .isLength({ min: 4 }),

    // There is no way to compare to inputs, so a custom validator must be made to compare two values
    check("confirm_password", "Passwords do not match")
        .custom((value, {req, loc, path}) => {
            if (value !== req.body.password) 
                throw new Error("Passwords do not match")
            else
                return value;
        })
    ],
    function (req, res, next) {
      const validationErrors = validationResult(req)

      if(!validationErrors.isEmpty())
        return res.status(400).send({state : constants.VALID_NOT_APPROVED, message: validationErrors.mapped()})
      // Define a new business
      const business = new BusinessModel({
        business_id : req.body.business_id,
        business_address : req.body.business_address,
        business_name : req.body.business_name,
        business_phone : req.body.business_phone
      });
      // Begin business registration
      BusinessModel.createBusiness(business, function(error, result){
        if(error){
          if ((error.name === 'BulkWriteError' || error.name === "MongoError") && error.code === 11000) 
            return res.status(400).send({state : constants.VALID_NOT_APPROVED, message : 'Business ID is already in use' })    
          else 
            console.log(error);
            return res.status(500).send({state : constants.UNKNOWN_ERROR, message: 'An unexpected error has occured when creating a business, please try again or contact an administrator' })
        }
        // Begin passport authentication - Local signup, found in passport-init.js
        passport.authenticate('local-user-signup', (err, businesId, info) => {
          if(err)
          {
            BusinessModel.findOneAndRemove({'_id' : business._id}).exec();
            if ((err.name === 'BulkWriteError' || err.name == "MongoError") && err.code === 11000) 
              return res.status(409).send({state : constants.VALID_NOT_APPROVED, message : 'Email is already in use' })
            else 
              console.log("An error occured that could not be identified: " + err)
              return res.status(400).send({state : constants.UNKNOWN_ERROR, message: "An unexpected error has occured creating the business, please try again or contact an administrator" })
          }
          // if ID was found, then the business is valid, and the user account is created
          if(businesId)
            return res.status(200).send({state : constants.SUCCESS, message: 'Business has been created! You may now log in'})
          
        })(req, res, next)
      });
  });
};
