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

const UserModel = require('../../models/user.js');

router.post('/', function(req, res, next) {

    var isRegistered = 0;
    var checkUser;
    if(req.query.login != null && req.query.password != null) {

        var newUser = new UserModel({
            login: req.query.login,
            password: req.query.password
        });

        logger.debug("Sent info (login + password): " +
            req.query.login + " - " + req.query.password);

        UserModel.findOne({login: req.query.login}, function(err, doc) {
            if(err) return console.log(err);
            logger.debug("Found user - " + doc);
            checkUser = doc;
            //res.send(checkUser);
        });
    }

    if(checkUser._id === req.query.login){
        res.send({"suchUserAlreadyExists": "true"});
    }


/*
    newUser.save(function (err) {
        if(err)
            return console.log(err);
        else {
            logger.info("User successfully inserted!");

            // Returning User DTO
            UserModel.findOne({login: req.query.login}, function(err, doc) {
                if(err) return console.log(err);
                res.send(doc);
            });
        }
    });*/
});

module.exports = router;