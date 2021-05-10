const express = require('express');
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


const Theme = require('../../../models/theme');
const Answers = require('../../../models/answers');
const Question = require('../../../models/question');
const Difficulty = require('../../../models/difficulty');
const League = require('../../../models/league');

exports.deleteTheme = function(req, res) {
    if(req.query.id != null) {
        var id = req.query.id;
    }
    Theme.findByIdAndDelete(id, function(err, delObj) {
        if(err){
            res.send({isDeleted: 1, error: err, object: "none"});
            return console.log(err);
        }
        else {
            logger.info("Theme successfully deleted!");
            res.send({isDeleted: 0, error: "none", object: delObj});
        }
    });
}

exports.deleteDifficulty = function(req, res) {
    if(req.query.id != null) {
        var id = req.query.id;
    }
    Difficulty.findByIdAndDelete(id, function(err, delObj) {
        if(err){
            res.send({isDeleted: 1, error: err, object: "none"});
            return console.log(err);
        }
        else {
            logger.info("Difficulty successfully deleted!");
            res.send({isDeleted: 0, error: "none", object: delObj});
        }
    });
}

exports.deleteLeague = function(req, res) {
    if (req.query.name != null ) {
        var leagueName = req.query.name;
    }
    League.findOneAndDelete({name: leagueName}, function(err, delObj) {
        if(err) {
            res.send({isDeleted: 1, error: err, object: "none"});
            return console.log(err);
        }
        else {
            logger.info("League successfully deleted!");
            res.send({isInserted: 0, error: "none", object: delObj});
        }
    });
}

exports.deleteQuestion = function (req, res) {
    if(req.query.id != null) {
        var id = req.query.id;
    }
    Question.findByIdAndDelete(id, function(err, delObj) {
        if(err){
            res.send({isDeleted: 1, error: err, object: "none"});
            return console.log(err);
        }
        else {
            logger.info("Question successfully deleted!");
            res.send({isDeleted: 0, error: "none", object: delObj});
        }
    });
}

exports.deleteAnswer = function (req, res) {
    if(req.query.id != null) {
        var id = req.query.id;
    }
    Answers.findByIdAndDelete(id, function(err, delObj) {
        if(err){
            res.send({isDeleted: 1, error: err, object: "none"});
            return console.log(err);
        }
        else {
            logger.info("Answer successfully deleted!");
            res.send({isDeleted: 0, error: "none", object: delObj});
        }
    });
}