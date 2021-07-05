const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const test_scoreSchema = new mongoose.Schema({
        candidateId: {
        type: Schema.Types.ObjectId,
        ref: 'candidate'
        },
    
    round: {
        type: String,
        enum:["first_round", "second_round" , "third_round"],
        default:"first_round"
    },
    status: {
        type: String,
        default: "ACTIVE"
    },
    score:{
        type: Number
    }

}, { timestamps: true });

module.exports = mongoose.model("test_score", test_scoreSchema, "test_score");