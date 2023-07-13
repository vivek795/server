const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    id : {type : Number},
    user : {type: String},
    checkPoint : {type : Number},
    isWait : {type : Boolean, default : false}
});

module.exports = mongoose.model('Game', gameSchema);