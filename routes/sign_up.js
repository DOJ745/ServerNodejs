const express = require('express');
const body_parser = require('body-parser');
const jsonParser = body_parser.json();
const router = express.Router();

const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({
    level: process.env.LOG_LEVEL || 'debug',
    prettyPrint: {
        colorize: true
    }
} );

const expressLogger = expressPino({logger});
const app = express();
app.use(expressLogger);

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useUnifiedTopology: true });

router.post('/', jsonParser, function(req, res, next) {

    let sentUserLogin = req.query.login;
    let sentUserPassword = req.query.password;
    //console.log("Sent info (login + email): " + sentUserLogin + " - " + sentUserEmail);
    logger.debug("Sent info (login + email): " + sentUserLogin + " - " + sentUserPassword);

    mongoClient.connect(function(err, client){

        const db = client.db("know_your_game_db");
        const collection = db.collection("users");

        if(err) return console.log(err);

        let user = { login: sentUserLogin, email: sentUserPassword };

        collection.insertOne(user, function(err, result) {
            if(err) {
                //return console.log("*** Error occurred! ***\n" + err);
                return logger.error("*** Error occurred! ***\n" + err);
            }
            else {
                //console.log("[Status code : " + req.baseUrl + "] - " + res.statusCode + "\n");
                //console.log("Inserted info: " + result.ops);

                logger.info("[Status code : " + req.baseUrl + "] - " + res.statusCode + "\n");
                logger.info("Inserted info: " + result.ops);

                res.send({login: sentUserLogin, password: sentUserPassword});
            }
            client.close();
        });
    });
});

module.exports = router;