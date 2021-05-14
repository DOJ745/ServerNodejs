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
            Question.deleteMany({theme_id: id}, function (err) {
                if(err){ return console.log(err); }
                else {
                    logger.info("Cascade deleted questions with same theme id");
                }
            });
            res.render('crud_info', {
                title: "Theme delete status",
                upd: delObj,
                backTo: "themes",
                crud_type: "Delete"
            });
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
            res.render('crud_info', {
                title: "Difficulty delete status",
                upd: delObj,
                backTo: "difficulties",
                crud_type: "Delete"
            });
        }
    });
}

exports.deleteLeague = function(req, res) {
    if (req.query.id != null ) {
        var id = req.query.id;
    }
    League.findByIdAndDelete(id, function(err, delObj) {
        if(err) {
            res.send({isDeleted: 1, error: err, object: "none"});
            return console.log(err);
        }
        else {
            logger.info("League successfully deleted!");
            res.render('crud_info', {
                title: "League delete status",
                upd: delObj,
                backTo: "leagues",
                crud_type: "Delete"
            });
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
            Answers.deleteMany({question_id: id}, function (err) {
                if(err){ return console.log(err); }
                else {
                    logger.info("Cascade deleted answers with same question id");
                }
            });
            res.render('crud_info', {
                title: "Question delete status",
                upd: delObj,
                backTo: "questions",
                crud_type: "Delete"
            });
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
            res.render('crud_info', {
                title: "Answer delete status",
                upd: delObj,
                backTo: "answers",
                crud_type: "Delete"
            });
        }
    });
}