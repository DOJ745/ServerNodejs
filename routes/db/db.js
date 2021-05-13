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
    res) {
    insertMethods.insertTheme(req, res);
});

DB_Router.post("/add/difficulty", function (
    req,
    res) {
    insertMethods.insertDifficulty(req, res);
});

DB_Router.post("/add/question", function (
    req,
    res) {
    insertMethods.insertQuestion(req, res);
});

DB_Router.post("/add/answer", function (
    req,
    res) {
    insertMethods.insertAnswer(req, res);
});

DB_Router.post("/add/league", function (
    req,
    res) {
    insertMethods.insertLeague(req, res);
});


DB_Router.post("/delete/theme", function (
    req,
    res) {
    deleteMethods.deleteTheme(req, res);
});

DB_Router.post("/delete/question", function (
    req,
    res) {
    deleteMethods.deleteQuestion(req, res);
});

DB_Router.post("/delete/answer", function (
    req,
    res) {
    deleteMethods.deleteAnswer(req, res);
});

DB_Router.post("/delete/difficulty", function (
    req,
    res) {
    deleteMethods.deleteDifficulty(req, res);
});

DB_Router.post("/delete/league", function (
    req,
    res) {
    deleteMethods.deleteLeague(req, res);
});

DB_Router.post("/delete/user", function (
    req,
    res) {
    userApi.deleteUser(req.query.login, res);
});


DB_Router.post("/update/theme", function (
    req,
    res) {
    updateMethods.updateTheme(req, res);
});

DB_Router.post("/update/question", function (
    req,
    res) {
    updateMethods.updateQuestion(req, res);
});

DB_Router.post("/update/answer", function (
    req,
    res) {
    updateMethods.updateAnswer(req, res);
});

DB_Router.post("/update/difficulty", function (
    req,
    res) {
    updateMethods.updateDifficulty(req, res);
});

DB_Router.post("/update/league", function (
    req,
    res) {
    updateMethods.updateLeague(req, res);
});

DB_Router.post("/update/user", function (
    req,
    res) {
    userApi.updateUser(req.query.login, req.query.score, res);
});

DB_Router.get("/themes", function (
    req,
    res) {

    getMethods.getThemes(req, res);

});

DB_Router.get("/difficulties", function (
    req,
    res) {

    getMethods.getDifficulties(req, res);

});


DB_Router.get("/questions", function (
    req,
    res) {

    getMethods.getQuestions(req, res);

});


DB_Router.get("/answers", function (
    req,
    res) {

    getMethods.getAnswers(req, res);

});


DB_Router.get("/leagues", function (
    req,
    res) {

    getMethods.getLeagues(req, res);

});

DB_Router.get("/logs", function (
    req,
    res) {

    res.render("themes", {title: "Themes"});

});

DB_Router.get("/users", function (
    req,
    res) {

    res.render("themes", {title: "Themes"});

});


module.exports = DB_Router;