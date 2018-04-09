const LocalStrategy         = require('passport-local').Strategy

const UserModel             = require('../server/models/UserRegistrationSchema');
const BusinessModel         = require('../server/models/BusinessRegistrationSchema');

module.exports = function(passport) {

    //===============
    // PASSPORT SERIALIZATION ==========
    //===============
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        UserModel.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //===============
    // USER LOGIN (LOCAL STRATEGY) ==========
    //===============
    passport.use('local-user-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    }, function(req, email, password, done) {
        UserModel.findOne({email : email}, function(err, user) {
            if(err)
                done(err);
            if(!user)
                return done(null, false);
            user.verifyPassword(password, function(error, isMatch) {
                if(error)
                    return done(err);
                if(!isMatch)
                    return done(null, false);
                return done(null, user);
            });
        });
    }));

    //===============
    // USER REGISTRATION (LOCAL STRATEGY) ==========
    //===============
    passport.use('local-user-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
            // Find a business with a similar ID as the one the user provides in the form
            BusinessModel.findOne({ 'business_id' :  req.body.business_id }, function(err, idFound) {
                // if there are any errors, return the error
                if (err)
                    return done(err);
                // check to see if an is found, and create an account
                if (idFound) {
                    // Define new user
                    var user = new UserModel({
                        fname : req.body.fname,
                        lname : req.body.lname,
                        email : req.body.email,
                        business_id : req.body.business_id,
                        password : req.body.password,
                    });
                    UserModel.createUser(user, function(userModelError, result){
                        if(userModelError)
                            return done(userModelError);

                        BusinessModel.update({'business_id' :  req.body.business_id}, {$push : {'user_id' : user._id}}).exec();
                        return done(null, user);
                    });
                } else {
                    return done(null, false);
                }
            });  
        });
    }));
};