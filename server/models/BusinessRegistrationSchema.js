const mongoose              = require('mongoose');
const Schema                = mongoose.Schema;

var businessRegistration = new Schema({
    business_id : {
        type : String,
        required : true,
        index: { unique: true }
    },
    business_address : {
        type : String,
        required: true
    },
    business_name : {
        type: String,
        required: true
    },
    business_phone : {
        type: String,
        required: true
    },
    business_admins : {
        type : [Schema.ObjectId],
        ref : 'Users'
    },
    isDeleted : {type: Boolean, default: false},
    isiPaid : {type: Boolean, default: true},
});

const Business = module.exports = mongoose.model('Business', businessRegistration);

module.exports.createBusiness = function(newBusiness, callBack){
    newBusiness.save(callBack);
}