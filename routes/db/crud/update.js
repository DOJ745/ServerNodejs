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

exports.updateTheme = function(req, res) {
    if(req.query.id != null && req.query.name != null) {
        var id = req.query.id;
        var newName = req.query.name;
    }
    Theme.findByIdAndUpdate(
        id,
        {name: newName},
        {new: true},
        function(err, updObj) {
        if(err){
            res.send({isUpdated: 1, error: err, object: "none"});
            return console.log(err);
        }
        else {
            logger.info("Theme successfully updated!");

            res.render('crud_info', {
                title: "Theme update status",
                upd: updObj,
                backTo: "themes",
                crud_type: "Update"
            });
        }
    });
}

exports.updateDifficulty = function(req, res) {
    if(
        req.query.id != null &&
        req.query.name != null &&
        req.query.multiplier != null
    ) {
        var id = req.query.id;
        var newName = req.query.name;
        var newMultiplier = req.query.multiplier;
    }
    Difficulty.findByIdAndUpdate(id,
        {name: newName, multiplier: newMultiplier},
        {new: true},
        function(err, updObj) {
        if(err){
            res.send({isUpdated: 1, error: err, object: "none"});
            return console.log(err);
        }
        else {
            logger.info("Difficulty successfully updated!");

            res.render('crud_info', {
                title: "Difficulty update status",
                upd: updObj,
                backTo: "difficulties",
                crud_type: "Update"
            });
        }
    });
}

exports.updateLeague = function(req, res) {
    if (
        req.query.id != null &&
        req.query.name != null &&
        req.query.image != null &&
        req.query.rating != null) {

        var id = req.query.id;
        var newLeagueName = req.query.name;
        var newImage = req.query.image;
        var newRating = req.query.rating;
    }
    League.findByIdAndUpdate(id,
        {name: newLeagueName, image: newImage, rating: newRating},
        {new: true},
        function(err, updObj) {
        if(err) {
            res.send({isUpdated: 1, error: err, object: "none"});
            return console.log(err);
        }
        else {
            logger.info("League successfully updated!");

            res.render('crud_info', {
                title: "League update status",
                upd: updObj,
                backTo: "leagues",
                crud_type: "Update"
            });
        }
    });
}

exports.updateQuestion = function (req, res) {
    if(
        req.query.id != null &&
        req.query.theme_id != null &&
        req.query.difficulty_id != null &&
        req.query.text != null &&
        req.query.image != null &&
        req.query.cost != null) {

        var id = req.query.id;
        var newThemeId = req.query.theme_id;
        var newDifficultyId = req.query.difficulty_id;
        var newText = req.query.text;
        var newImage = req.query.image;
        var newCost = req.query.cost;
    }
    Question.findByIdAndUpdate(
        id,
        {
            theme_id: newThemeId,
            difficulty_id: newDifficultyId,
            text: newText,
            image: newImage,
            cost: newCost
        },
        {new: true},
        function(err, updObj) {
        if(err) {
            res.send({isUpdated: 1, error: err, object: "none"});
            return console.log(err);
        }
        else {
            logger.info("Question successfully updated!");

            res.render('crud_info', {
                title: "Question update status",
                upd: updObj,
                backTo: "questions",
                crud_type: "Update"
            });
        }
    });
}

exports.updateAnswer = function (req, res) {
    if(
        req.query.id != null &&
        req.query.question_id != null &&
        req.query.text != null &&
        req.query.trueness != null) {

        var id = req.query.id;
        var newQuestionId = req.query.question_id;
        var newText = req.query.text;
        var newTrueness = req.query.trueness;
    }
    Answers.findByIdAndUpdate(
        id,
        {
            question_id: newQuestionId,
            text: newText,
            trueness: newTrueness
        },
        {new: true},
        function(err, updObj) {
        if(err){
            res.send({isDeleted: 1, error: err, object: "none"});
            return console.log(err);
        }
        else {
            logger.info("Answer successfully updated!");

            res.render('crud_info', {
                title: "Answer update status",
                upd: updObj,
                backTo: "answers",
                crud_type: "Update"
            });
        }
    });
}