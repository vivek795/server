const mongoose = require("mongoose");

const attackSchema = new mongoose.Schema({
    id : {type : Number},
    checkPoint : {type : String},
    attackName : {type : String }
});

module.exports = mongoose.model('Attack', attackSchema);