const express = require("express");
const router = express.Router({ mergeParams: true, caseSensitive: true });
const { body, validationResult } = require("express-validator");

const Game = require("../models/game.js");
const Attack = require("../models/attack.js");

let CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { monitorEventLoopDelay } = require("perf_hooks");

router.post("/checkUpdate", async(req, res) => {
    try{
        const checkData = await Game.findOne({id : 1});

        if(checkData === null || checkData.user === null || checkData.user !== "Player" || checkData.isWait !== true){
            return res.status(200).json({success : false});
        }

        const updateData = await Game.findOneAndUpdate({id : 1}, {user : "Attacker", isWait : true});
        
        console.log("check Update  Attacker : ");
        console.log(updateData);

        return res.status(200).json({success : true, checkPoint : checkData.checkPoint});
    }
    catch(err){
        return res.status(500).json({error : "Internal Server Error"});
    }
});

router.post("/doAttack", async(req, res) => {
    try{
        const {attackOption, checkPoint} = req.body;

        if(!attackOption){
            return res.status(400).json("Attack Not Found");
        }

        const checkUpdate = await Attack.findOneAndUpdate({id : 1}, {attackName : attackOption, checkPoint : checkPoint});

        if(!checkUpdate){
            const newAttack = await Attack.create({id : 1, attackName : attackOption, checkPoint : checkPoint});
        }

        console.log("Do Attack : -> ");
        console.log(checkUpdate);

        return res.status(200).json("Attack Successful!");
    }
    catch(err){
        return res.status(500).json({error : "Internal Server Error"});
    }
});

module.exports = router ;
