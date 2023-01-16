const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    loggedIn:{
        type: Boolean,
        require: true
    }
},
{
    timestamps:true
}

);

const Account = mongoose.model('Account', accSchema);
module.exports=Account;