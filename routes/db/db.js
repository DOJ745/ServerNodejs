const express = require('express');
const DB_Router = express.Router();

const Theme = require('../../models/theme');
const Answers = require('../../models/answers');
const Question = require('../../models/question');
const Difficulty = require('../../models/difficulty');
const League = require('../../models/league');

const insertMethods = require('./crud/insert');
const deleteMethods = require('./crud/delete');
const updateMethods = require('./crud/update');
const getMethods = require('./crud/get');
const userApi = require('../../api/user_api');

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
        res.send(db_doc);
    });
});

DB_Router.post("/add/theme", function (
    req,
    res,
    next) {
    insertMethods.insertTheme(req, res);
});

DB_Router.post("/add/difficulty", function (
    req,
    res,
    next) {
    insertMethods.insertDifficulty(req, res);
});

DB_Router.post("/add/question", function (
    req,
    res,
    next) {
    insertMethods.insertQuestion(req, res);
});

DB_Router.post("/add/answer", function (
    req,
    res,
    next) {
    insertMethods.insertAnswer(req, res);
});

DB_Router.post("/add/league", function (
    req,
    res,
    next) {
    insertMethods.insertLeague(req, res);
});


DB_Router.post("/delete/theme", function (
    req,
    res,
    next) {
    deleteMethods.deleteTheme(req, res);
});

DB_Router.post("/delete/question", function (
    req,
    res,
    next) {
    deleteMethods.deleteQuestion(req, res);
});

DB_Router.post("/delete/answer", function (
    req,
    res,
    next) {
    deleteMethods.deleteAnswer(req, res);
});

DB_Router.post("/delete/difficulty", function (
    req,
    res,
    next) {
    deleteMethods.deleteDifficulty(req, res);
});

DB_Router.post("/delete/league", function (
    req,
    res,
    next) {
    deleteMethods.deleteLeague(req, res);
});

DB_Router.post("/delete/user", function (
    req,
    res,
    next) {
    userApi.deleteUser(req.query.login, res);
});


DB_Router.post("/update/theme", function (
    req,
    res,
    next) {
    updateMethods.updateTheme(req, res);
});

DB_Router.post("/update/question", function (
    req,
    res,
    next) {
    updateMethods.updateQuestion(req, res);
});

DB_Router.post("/update/answer", function (
    req,
    res,
    next) {
    updateMethods.updateAnswer(req, res);
});

DB_Router.post("/update/difficulty", function (
    req,
    res,
    next) {
    updateMethods.updateDifficulty(req, res);
});

DB_Router.post("/update/league", function (
    req,
    res,
    next) {
    updateMethods.updateLeague(req, res);
});

DB_Router.post("/update/user", function (
    req,
    res,
    next) {
    userApi.updateUser(req.query.login, req.query.score, res);
});

DB_Router.get("/get/themes", function (
    req,
    res,
    next) {
    getMethods.getThemes(req, res);
})

module.exports = DB_Router;