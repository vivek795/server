const express = require("express");
const router = express.Router({ mergeParams: true, caseSensitive: true });
const { body, validationResult } = require("express-validator");

const Game = require("../models/game.js");
const Attack = require("../models/attack.js");

let CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { monitorEventLoopDelay } = require("perf_hooks");

const checkPoint1 = [
    {
        attack : "Email Phishing",
        text : "Email Phishing",
        defence : "Block malicious email sent from unrelible sources",
    },
    {
        attack : "Spear phishing",
        text : "Spear phishing",
        defence : "Implement DMARC Technology",
    },
    {
        attack : "Smishing and Vishing",
        text : "Smishing and Vishing",
        defence : "Lookout for messages originating from spoofed number and block them",
    },
    {
        attack : "Angler Phishing",
        text : "Angler Phishing",
        defence : "Verify the Company Account and if found fraudulent block the origin",
    }
];


const checkPoint2 = [
    {
        attack : "IP spoofing",
        text : "IP spoofing",
        defence : "Authenticating Users and Devices Through PKI and block requests from non-authenticated sources",
    },
    {
        attack : "DNS spoofing",
        text : "DNS spoofing",
        defence : "Perform thorough DNS traffic-filtering",
    },
    {
        attack : "GPS Spoofing",
        text : "GPS Spoofing",
        defence : "Follow the principle of least priviledge and do not allow any unwanted apps to access the GPS",
    },
    {
        attack : "WiFi Eavesdropping",
        text : "WiFi Eavesdropping",
        defence : "Use Firewallls and do not allow any malicious users",
    }
];


const checkPoint3 = [
    {
        attack : "Ping of Death",
        text : "Ping of Death",
        defence : "Add checks to the reassembly process to make sure the maximum packet size constraint will not be exceeded after packet recombination. ",
    },
    {
        attack : "HTTP Flood",
        text : "HTTP Flood",
        defence : "Use load balancers and web application firewalls (WAFs)",
    },
    {
        attack : "Zero-day DDoS Attacks",
        text : "Zero-day DDoS Attacks",
        defence : "Use Windows Defender Exploit Guard along with Attack Surface Reduction (ASR)",
    },
    {
        attack : "Slowloris",
        text : "Slowloris",
        defence : "Use a hardware load balancer that accepts only complete HTTP connections. The hardware load balancer with an HTTP profile configuration inspects the packets and only forwards complete HTTP requests to the web server.",
    }
]


router.post("/checkUpdate", async(req, res) => {
    try{
        const checkData = await Attack.findOne({id : 1});

        if(checkData === null || checkData.attackName === null || checkData.checkPoint === null){
            return res.status(200).json({success : false});
        }

        const attackName = checkData.attackName;
        const checkPoint = checkData.checkPoint;

        let attackText;

        if(checkPoint === 1){
            checkPoint1.forEach(async (element) => {
                if(element.attackName === attackName){
                    attackText = element.attackText;
                }
            })
        }

        else if(checkPoint === 2){
            checkPoint2.forEach(async (element) => {
                if(element.attackName === attackName){
                    attackText = element.attackText;
                }
            })
        }

        else if(checkPoint === 3){
            checkPoint3.forEach(async (element) => {
                if(element.attackName === attackName){
                    attackText = element.attackText;
                }
            })
        }

        return res.status(200).json({success : true, attackName : attackText , checkPoint : checkData.checkPoint});
    }
    catch(err){
        return res.status(500).json({error : "Internal Server Error"});
    }
});


router.post("/doDefend", async (req, res) => {
    try{
        const {defendOption, checkPoint, attackText} = req.body;

        if(!defendOption){
            return res.status(400).json("Defend Not Found");
        }

        // const checkData = await Attack.findOne({id : 1, checkPoint : checkPoint});
        // if(checkData === null){
        //     return res.status(400).json({error : "No Attack was there to defend!"});
        // }

        
        if(checkPoint === 1){
            checkPoint1.forEach(async (element) => {
                if(element.text === attackText){
                    if(element.defence === defendOption){
                        const updateData = await Game.findOneAndUpdate({id : 1}, {user : "Defender", isWait : false, checkPoint : 1});
                        return res.status(200).json({success : true });
                    }
                    else{
                        const updateData = await Game.findOneAndUpdate({id : 1}, {user : "Attacker", isWait : false , checkPoint : 1});
                        return res.status(200).json({success : false});
                    }
                }
            })
        }

        else if(checkPoint === 2){
            checkPoint2.forEach(async (element) => {
                if(element.text === attackText){
                    if(element.defence === defendOption){
                        const updateData = await Game.findOneAndUpdate({id : 1}, {user : "Defender", isWait : false, checkPoint : 2});
                        return res.status(200).json({success : true});
                    }
                    else{
                        const updateData = await Game.findOneAndUpdate({id : 1}, {user : "Attacker", isWait : false , checkPoint : 2});
                        return res.status(200).json({success : false});
                    }
                }
            })
        }

        else if(checkPoint === 3){
            checkPoint3.forEach(async (element) => {
                if(element.text === attackText){
                    if(element.defence === defendOption){
                        const updateData = await Game.findOneAndUpdate({id : 1}, {user : "Defender", isWait : false, checkPoint : 3});
                        return res.status(200).json({success : true});
                    }
                    else{
                        const updateData = await Game.findOneAndUpdate({id : 1}, {user : "Attacker", isWait : false , checkPoint : 3});
                        return res.status(200).json({success : false});
                    }
                }
            })
        }
        
    
        // return res.status(200).json({success : true, message : "Defend Successfull!"});
    }
    catch(err){
        return res.status(500).json({error : "Internal Server Error"});
    }
});

module.exports = router;
