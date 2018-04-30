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
    business_items : [{
        category : String,
        items : [{name: String, price: Number}]
    }],
    business_tables : [{
        table_name : String,
        items : [{name: String, price: Number, amount : Number}]
    }],
    business_transactions : [{
        items : [{name : String, price : Number}],
        total : Number,
    }],
    isDeleted : {type: Boolean, default: false},
    isiPaid : {type: Boolean, default: true},
});

const Business = module.exports = mongoose.model('Business', businessRegistration);

module.exports.createBusiness = function(newBusiness, callBack){
    newBusiness.save(callBack);
}