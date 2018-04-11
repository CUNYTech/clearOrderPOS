const { check, validationResult }   = require('express-validator/check');
const { matchedData, sanitize }     = require('express-validator/filter');

const passport                      = require('passport');
const LocalStrategy                 = require('passport-local').Strategy;

const BusinessModel                 = require('../../models/BusinessRegistrationSchema');
const UserModel                     = require('../../models/UserRegistrationSchema');
const sharedFunctions               = require('../sharedFunctions.js');

const mongoose                      = require('mongoose');

module.exports = (app) => {

  function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
  }

  app.get('/business/get-categories', isAuthenticated, function(req,res,next) {
    UserModel.findOne({'email' : req.user.email}, 'business_id', (err, person) => {
      if(err){
         return req.status(500);
      }

      BusinessModel.find().where('business_id').equals(person.business_id)
        .select('business_items')
        .find(function(err, array){
          if(err)
            return;
          res.status(200).send(array);
        });
    })
  });

  app.post('/business/add_category', [
    check('name')
      .trim()
      .isLength({min : 1})
      .withMessage("A name must be provided")
  ], 
  function (req, res, next) {
    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpty())
      return res.status(400).send({message: validationErrors.mapped()});
    
    UserModel.findOne({'email' : req.user.email}, 'business_id', (err, person) => {
      if(err){
         return req.status(500);
      }


      BusinessModel.findOneAndUpdate({'business_id' : person.business_id},
        {
          $push : {
            business_items : {"category": req.body.name, "items": {"name": "Pizza", "price": 10}}
          } 
        },{upsert:true, new : true}, (bsnsError, result) => {
          if(bsnsError){
            return res.status(500);
          }
          return res.status(200);
        }
      )
    })
  });

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
                throw new Error("Passwords do not match");
            else
                return value;
        })
    ],
    function (req, res, next) {
      const validationErrors = validationResult(req);

      if(!validationErrors.isEmpty())
        return res.status(400).send({message: validationErrors.mapped(), hasMultiple : true});
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
          if ((error.name === 'BulkWriteError' || error.name === "MongoError") && error.code === 11000) {
            return res.status(400).send({ message : 'Business ID is already in use' });           
          } else {
            console.log(error);
            return res.status(500).send({ message: 'An unexpected error has occured when creating a business, please try again or contact an administrator' });
          }
        }
        // Begin passport authentication - Local signup, found in passport-init.js
        passport.authenticate('local-user-signup', (err, businesId, info) => {
          if(err)
          {
            BusinessModel.findOneAndRemove({'_id' : business._id}).exec();
            if ((err.name === 'BulkWriteError' || err.name == "MongoError") && err.code === 11000) {
              return res.status(409).send({ message : 'Email is already in use' });           
            } else {
              console.log("An error occured that could not be identified: " + err);
              return res.status(400).send({ message: "An unexpected error has occured creating the business, please try again or contact an administrator" });
            }
          }
          // if ID was found, then the business is valid, and the user account is created
          if(businesId)
          {
            return res.status(200).send({message: 'Business has been created! You may now log in'});
          }
        })(req, res, next);
      });
  });
};
