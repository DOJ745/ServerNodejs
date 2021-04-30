const express = require('express');
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

const Models = require('../../models/user');

router.post('/', function(req, res, next) {

    if(req.query.login != null && req.query.password != null) {

        logger.debug("Sent info (login + password): " +
            req.query.login + " - " + req.query.password);

        var newUser = new Models.UserModel({
            login: req.query.login,
            password: req.query.password
        });
    }

    newUser.save(function (err) {
        if(err)
            return console.log(err);
        else {
            logger.info("User successfully inserted!");
            res.send( {login: req.query.login, password: req.query.password} );
        }
    });

    /*mongoClient.connect(function(err, client){

        const db = client.db("know_your_game_db");
        const collection = db.collection("users");

        if(err) return console.log(err);

        let user = { login: sentUserLogin, email: sentUserPassword };

        collection.insertOne(user, function(err, result) {
            if(err) { return console.error("*** Error occurred! ***\n" + err); }
            else {
                logger.info("[Status code : " + req.baseUrl + "] - " + res.statusCode + "\n");
                logger.info("Inserted info: " + result.ops);

                res.send({login: sentUserLogin, password: sentUserPassword});
            }
            client.close();
        });
    });*/
});

module.exports = router;