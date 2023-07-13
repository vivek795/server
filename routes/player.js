const express = require("express");
const router = express.Router({ mergeParams: true, caseSensitive: true });
const { body, validationResult } = require("express-validator");

const Game = require("../models/game.js");

let CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { monitorEventLoopDelay } = require("perf_hooks");

router.post("/obstacleHit", async (req, res) => {
    try{
        const {checkPoint} = req.body;

        console.log(checkPoint);
    
        const toUpdate = {
            id : 1,
            user: "Player",
            checkPoint : checkPoint,
            isWait : true
        }
    
        const checkUpdate = await Game.findOneAndUpdate({id : 1}, toUpdate , {new : true});
    
        if(checkUpdate === null){
            const newUpdate = await Game.create(toUpdate);
        }

        res.status(200).json("Obstacle Got Hit!");
    }
    catch(err){
        res.status(500).json({error : err});
    }
});


router.post("/checkWait", async (req, res) => {
    try{
        const checkData = await Game.findOne({id : 1});

        if(checkData === null){
            res.status(400).json({error : "No Data Available!"});
        }

        if(checkData.isWait === false  &&  checkData.user !== "Player"){
            res.status(200).json({isWait : false , user : checkData.user, checkPoint : checkData.checkPoint});
        }

        res.status(200).json({isWait : true , user : null, checkPoint: null});
    }
    catch(err){
        res.status(500).json({error : err});
    }
});

module.exports = router;

