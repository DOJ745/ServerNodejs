const config = require("../../config/config");
const api = require("../../user_api");

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
const session = require('express-session')
const MongoStore = require('connect-mongo');

const UserModel = require('../../models/user.js');

const app = express();
app.use(expressLogger);

app.use(session({
    secret: 'this is not these droids',
    resave: false,
    saveUninitialized: false,
    // Место хранения можно выбрать из множества вариантов, это и БД и файлы и Memcached.
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/know_your_game_db',
    })
}))

router.post('/', function(req, res, next) {

    api.createUser(req.query.login, req.query.password)
        .then(function(result) {
            logger.debug("User created");
        })
        .catch(function(err){
            if (err){
                res.status(500).send({"error": "This user already exist"});
            }
        })
    /*
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
            res.send(checkUser);
        });
    }


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