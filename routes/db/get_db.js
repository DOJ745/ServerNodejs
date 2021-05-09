const express = require('express');
const DB_Router = express.Router();

const Theme = require('../../models/theme');
const Answers = require('../../models/answers');
const Question = require('../../models/question');
const Difficulty = require('../../models/difficulty');
const League = require('../../models/league');

const insertModels = require('./insert/insert_theme');

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

DB_Router.get("/data", function(req, res, next) {

    var db_doc = {};
    Theme.find({}, function (err, themes){
        if(err){
            logger.error("Error with finding themes!" + err);
            res.send({"error": err});
        }
        logger.info(themes);
        db_doc.themes = themes;
        res.send(db_doc);
    });
});

DB_Router.post("/theme", function (req, res, next) {
    insertModels.insertTheme(req, res);
});

/*
DB_Router.post("/theme/:name", function(req, res, next) {

    if(req.params.name != null) {
        var theme = {name: req.params.name};
    }
    Theme(theme).save(function (err) {
        if(err)
            return console.log(err);
        else {
            logger.info("Theme successfully inserted!");
            res.send({success: "yes"});
        }
    });
});*/

module.exports = DB_Router;