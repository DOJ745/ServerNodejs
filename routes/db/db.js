const express = require('express');
const DB_Router = express.Router();

const Theme = require('../../models/theme');
const Answers = require('../../models/answers');
const Question = require('../../models/question');
const Difficulty = require('../../models/difficulty');
const League = require('../../models/league');

const insertModels = require('./crud/insert');

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
    });
    Difficulty.find({}, function (err, difficulties){
        if(err){
            logger.error("Error with finding difficulties!" + err);
            res.send({"error": err});
        }
        logger.info(difficulties);
        db_doc.difficulties = difficulties;
    });
    Question.find({}, function (err, questions){
        if(err){
            logger.error("Error with finding questions!" + err);
            res.send({"error": err});
        }
        logger.info(questions);
        db_doc.questions = questions;
    });
    Answers.find({}, function (err, answers){
        if(err){
            logger.error("Error with finding answers!" + err);
            res.send({"error": err});
        }
        logger.info(answers);
        db_doc.answers = answers;
    });
    League.find({}, function (err, leagues){
        if(err){
            logger.error("Error with finding leagues!" + err);
            res.send({"error": err});
        }
        logger.info(leagues);
        db_doc.leagues = leagues;
    });
    res.send(db_doc);
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