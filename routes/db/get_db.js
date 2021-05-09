const express = require('express');
const DB_Router = express.Router();

const Theme = require('../../models/theme');
const Answers = require('../../models/answers');
const Question = require('../../models/question');
const Difficulty = require('../../models/difficulty');
const League = require('../../models/league');

const insertModels = require('./insert');

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
        //res.send(db_doc);
    });
    Difficulty.find();
    Question.find();
    Answers.find();
    League.find();
});

DB_Router.post("/add/theme", function (req, res, next) {
    insertModels.insertTheme(req, res);
});

DB_Router.post("/add/difficulty", function (req, res, next) {
    insertModels.insertDifficulty(req, res);
});

DB_Router.post("/add/question", function (req, res, next) {
    insertModels.insertQuestion(req, res);
});

DB_Router.post("/add/answer", function (req, res, next) {
    insertModels.insertAnswer(req, res);
});

DB_Router.post("/add/league", function (req, res, next) {
    insertModels.insertLeague(req, res);
});

module.exports = DB_Router;