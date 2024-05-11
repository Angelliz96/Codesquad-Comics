const mongoose = require("mongoose");
const passport = require("passport");
const {Schema} = mongoose

const userSchema = new Schema({
    fistName:{
        type: String,
        required:true,

    },
lastName:{
    type: String,
    // require:true,

},
userName:{
    type: String,
    require:true,
    unique: true,

},
password:{
    type: Buffer,
    // require:true,

},
salt:{
    type: Buffer,
    // require:true, 

},
strategy:{
    type: Number,
    require:true,

},
synopsis:{
    type: String,
    require:true,

},
image:{
    type: String,
    require:true,

}

});


const Users = mongoose.model("Users", userSchema);

module.exports = Users;