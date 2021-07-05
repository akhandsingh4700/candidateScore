const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    status:{
        type:String,
        default:"ACTIVE"
    }
   
}, { timestamps: true });

module.exports = mongoose.model("candidate", userSchema, "candidate");