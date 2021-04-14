const express = require('express');
const body_parser = require('body-parser');
const jsonParser = body_parser.json();
const router = express.Router();


const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useUnifiedTopology: true });

router.post('/', jsonParser, function(req, res, next) {

    let sentUserLogin = req.body.login;
    let sentUserEmail = req.body.email;
    console.log("Sent info (login + email): " + sentUserLogin + " - " + sentUserEmail);

    mongoClient.connect(function(err, client){

        const db = client.db("usersdb");
        const collection = db.collection("users");

        if(err) return console.log(err);

        let user = { login: sentUserLogin, email: sentUserEmail };

        collection.insertOne(user, function(err, result) {
            if(err){ return console.log("*** Error occurred! ***\n" + err); }
            else {
                console.log("[Status code : " + req.baseUrl + "] - " + res.statusCode + "\n");
                console.log("Inserted info: " + result.ops);
            }
            client.close();
        });
    });

    //console.log("[Status code : " + req.baseUrl + "] - " + res.statusCode + "\n");
});

module.exports = router;