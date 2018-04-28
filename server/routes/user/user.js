const bodyParser                    = require('body-parser');
const bcrypt                        = require('bcrypt');

const { check, validationResult }   = require('express-validator/check');
const { matchedData, sanitize }     = require('express-validator/filter');

const passport                      = require('passport');
const LocalStrategy                 = require('passport-local').Strategy;

const UserReg                       = require('../../models/UserRegistrationSchema');
const BusinessReg                   = require('../../models/BusinessRegistrationSchema');
const sharedFunctions               = require('../sharedFunctions');

const constants                     = require('../../constants');

module.exports = (app) => {
  // Midleware - is user logged in?
  function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send({message : "Not Authorized"});
    }
  }

  app.get('/user-auth', isAuthenticated, (req, res, next) => {
    return res.status(200);
  });

  app.get('/user-logout', isAuthenticated, (req, res, next) => {
    req.logout();
    return res.status(200);
  });

  //
  //  USER CHANGE PASSWORD
  //

  app.post('/user/change_password', isAuthenticated,
  [ 
    check('old_password', 'Please enter your correct old password')
      .trim()
      .isLength({min: 4}),
    check('new_password', 'Please enter a new valid password with 4 characters')
      .trim()
      .isLength({min: 4}),
    check("confirm_password", "Passwords do not match")
      .custom((value, {req, loc, path}) => {
          if (value !== req.body.new_password) 
              throw new Error("Passwords do not match");
          else
              return value;
      }),
  ], (req, res, next) => {
    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpty())
      return res.status(400).send({message: validationErrors.mapped()});
    
    UserReg.findOne({'email' : req.user.email}, (error, user) => {
      if(user.verifyPassword(req.body.old_password, (error, isMatch) => {
        if(error || !isMatch)
          return res.status(500).send({message : 'The previous password is not correct', state : constants.PASSWORD_NOT_CHANGED})
          
        bcrypt.genSalt(10, function(genError, salt){
          bcrypt.hash(req.body.new_password, salt, function(hashError, hash){
            UserReg.findOneAndUpdate({'email' : req.user.email}, 
              {$set: {password : hash }} , (setError, user) => {
                if(setError || genError || hashError)
                  return res.status(500).send({state : constants.PASSWORD_NOT_CHANGED})
                return res.status(200).send({message : 'Password has been changed', state : constants.SUCCESS});
                })
              })
            })
      }));
    })
  })

    //
  //  USER CHANGE PERSONAL INFORMATION
  //

  app.post('/user/change_data', isAuthenticated,
  [ 
    check('fname', 'Please enter a valid first name')
      .trim()
      .isLength({min: 1}),
    check('lname', 'Please enter a valid last name')
      .trim()
      .isLength({min: 1}),
    check('email', 'Please enter a valid email')
      .trim()
      .isEmail(),

  ], (req, res, next) => {
    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpty())
      return res.status(400).send({message: validationErrors.mapped()});  

    UserReg.findOneAndUpdate({'email' : req.user.email}, 
      {$set: {fname : req.body.fname, lname: req.body.lname, email : req.body.email }} , (setError, user) => {
        if(setError)
          return res.status(500).send({state : constants.DATA_NOT_CHANGED})
          req.session.destroy()
          return res.status(200).send({message: 'Success! Please log in again with your new data'});

    })
  })

  //===============
  // USER LOGIN ROUTE =========================
  //====================
  app.post('/user/login', [
    check('email')
      .trim()
      .isEmail().withMessage('Must be a valid email'),

    check("password", "Please insert a password")
      .trim()
      .isLength({ min: 1 }),
    ], 
    (req, res, next) => {
      const validationErrors = validationResult(req);

      if(!validationErrors.isEmpty())
        return res.status(400).send({message: validationErrors.mapped(), hasMultiple : true});
      
      // Begin passport authentication - Local login, found in passport-init.js
      passport.authenticate('local-user-login', (err, user, info) => {
        if(err)
        {
          console.log("An error occured that could not be identified: " + err);
          return res.status(400).send({ message: "An unexpected error has occured when creating a user, please try again or contact an administrator" });
        }
        // If a user wasn't found, send an error that authentication failed
        if(!user)
        {
          return res.status(409).send({message : "The specified information is not valid"});
        }
        // If everything is right, then account is created and we send this message 
        //
        req.logIn(user, function(err) {
          if(err) { return res.status(400).send({message : "An unexpected error has occured when creating a user, please try again or contact an administrator"}); }
          return res.status(200).send({message: 'You are now logged in as ' + req.user.email});
        });
      })(req, res, next);
  });
  
  //===============
  // USER REGISTER ROUTE =========================
  //====================
  app.post('/user/register', [
    // Begin Form Validation
    check('fname')
      .trim()
      .isLength({ min: 1 })
      .withMessage('First Name is required'),

    check('lname')
      .trim()
      .isLength({min: 1})
      .withMessage('Last Name is required'),

    check('email')
      .trim()
      .isEmail().withMessage('Must be a valid email'),

    check("password", "Password must be 4 characters or more")
      .trim()
      .isLength({ min: 4 }),

    check("confirm_password", "Passwords do not match")
      .custom((value, {req, loc, path}) => {
          if (value !== req.body.password) 
              throw new Error("Passwords do not match");
          else
              return value;
      }),
    check('business_id')
      .trim()
      .isLength({min: 1})
      .withMessage('Company Code is required')
    ], 
    (req, res, next) => {
      const validationErrors = validationResult(req);

      if(!validationErrors.isEmpty())
        return res.status(400).send({message: validationErrors.mapped(), hasMultiple : true});
      
      // Begin passport authentication - Local signup, found in passport-init.js
      passport.authenticate('local-user-signup', (err, businesId, info) => {
        if(err)
        {
          if ((err.name === 'BulkWriteError' || err.name == "MongoError") && err.code === 11000) {
            return res.status(409).send({ message : 'Email is already in use' });           
          } else {
            console.log("An error occured that could not be identified: " + err);
            return res.status(400).send({ message: "An unexpected error has occured when creating a user, please try again or contact an administrator" });
          }
        }
        // If a business ID was not found, display the message
        if(!businesId)
        {
          return res.status(409).send({message : "The specified business id was not found"});
        }
        // If everything is right, then account is created and we send this message 
        return res.status(200).send({message: 'Account has been created! You may now log in'});
      })(req, res, next);
  });
};
