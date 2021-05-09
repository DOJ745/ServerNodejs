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


const Theme = require('../../models/theme');
const Answers = require('../../models/answers');
const Question = require('../../models/question');
const Difficulty = require('../../models/difficulty');
const League = require('../../models/league');

exports.insertTheme = function(req, res) {
    if(req.query.name != null) {
        var theme = {name: req.query.name};
    }
    Theme(theme).save(function (err) {
        if(err)
            return console.log(err);
        else {
            logger.info("Theme successfully inserted!");
            res.send({success: "yes"});
        }
    });
}

exports.insertDifficulty = function(req, res) {
    if(req.query.name != null && req.query.multiplier) {
        var difficulty =
            {
                name: req.query.name,
                multiplier:  req.query.multiplier
            };
    }
    Difficulty(difficulty).save(function (err) {
        if(err)
            return console.log(err);
        else {
            logger.info("Difficulty successfully inserted!");
            res.send({success: "yes"});
        }
    });
}

exports.insertLeague = function(req, res) {
    if (req.query.name != null && req.query.multiplier) {
        var league =
            {
                name: req.query.name,
                multiplier: req.query.multiplier
            };
    }
    League(league).save(function (err) {
        if (err)
            return console.log(err);
        else {
            logger.info("League successfully inserted!");
            res.send({success: "yes"});
        }
    });
}

exports.insertQuestion = function (req, res) {
    if(req.query.difficulty_id != null && req.query.text != null && req.query.image != null ){
        var question = {
            difficulty_id: req.query.difficulty_id,
            text: req.query.text,
            image: req.query.image
        };
    }
    Question(question).save(function(err){
        if (err)
            return console.log(err);
        else {
            logger.info("Question successfully inserted!");
            res.send({success: "yes"});
        }
    });
}

exports.insertAnswer = function (req, res) {
    if(req.query.question_id != null && req.query.text != null && req.query.trueness != null ){
        var answer = {
            question_id: req.query.difficulty_id,
            text: req.query.text,
            trueness: req.query.trueness
        };
    }
    Answers(answer).save(function(err){
        if (err)
            return console.log(err);
        else {
            logger.info("Answer successfully inserted!");
            res.send({success: "yes"});
        }
    });
}

