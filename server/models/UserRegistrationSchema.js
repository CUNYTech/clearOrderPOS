const mongoose        = require('mongoose');
const bcrypt          = require('bcrypt');
const Schema          = mongoose.Schema;

var userRegistration = new Schema({
    fname : {
        type : String,
        required : [true, 'First Name is Required']
    },
    lname : {
        type : String,
        required : [true, 'Last Name is Required']
    },
    business_id : {
        type : String,
        required : [true, 'Business ID is Required']
    },
    business_position : {
        type : String,
        required : false,
        default: 'Employee'
    },
    email : {
        type : String,
        required : [true, 'Email is Required'],
        index: { unique: true }
    },
    password : {
        type : String,
        required : [true, 'Password is Required']
    },
    isDeleted : {type: Boolean, default: false},
});

userRegistration.methods.verifyPassword = function(password, callback)
{
    return bcrypt.compare(password, this.password, function(error, isMatch) {
        if(error)
            return callback(error);
        return callback(null, isMatch);
    });
}

var User = module.exports = mongoose.model('Users', userRegistration);

module.exports.createUser = function(newUser, callBack){
    // Generate a hash so that we store the user's password encrypted.
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            newUser.password = hash;
            // save data provided
            newUser.save(callBack);
        });
    });
}

module.exports.getUserByEmail = function(email, callBack){
    var query = {email: email};
    User.findOne(query, callBack);
}

module.exports.getUserById = function(id, callBack){
    User.findById(id, callBack);
}