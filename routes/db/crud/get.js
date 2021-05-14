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

const User = require('../../../models/user');
const Theme = require('../../../models/theme');
const Answers = require('../../../models/answers');
const Question = require('../../../models/question');
const Difficulty = require('../../../models/difficulty');
const League = require('../../../models/league');


exports.getThemes = function(req, res) {
    Theme.find({}, function(err, doc) {
        if (err) { res.render('error_page', {error: err}); }
        else if (doc.length) {
            res.render( 'tables_info/themes',
                {
                    list: doc,
                    insertTable: "theme"
                }
            );
        }
        else {
            logger.info("No themes found");
            res.render( 'tables_info/themes',
                {
                    list: doc,
                    insertTable: "theme"
                }
            );
        }
    });
}

exports.getDifficulties = function(req, res) {
    Difficulty.find({}, function(err, doc) {
        if (err) { res.render('error_page', {error: err}); }
        else if (doc.length) {
            res.render( 'tables_info/difficulties',
                {
                    list: doc,
                    insertTable: "difficulty"
                }
            );
        }
        else {
            logger.info("No difficulties found");
            res.render( 'tables_info/difficulties',
                {
                    list: doc,
                    insertTable: "difficulty"
                }
            );
        }
    });
}

exports.getLeagues = function(req, res) {
    League.find({}, function(err, doc) {
        if (err) { res.render('error_page', {error: err}); }
        else if (doc.length) {
            res.render( 'tables_info/leagues',
                {
                    list: doc,
                    insertTable: "league"
                }
            );
        }
        else {
            logger.info("No leagues found");
            res.render( 'tables_info/leagues',
                {
                    list: doc,
                    insertTable: "league"
                }
            );
        }
    });
}

exports.getQuestions = function(req, res) {
    Question.find({}, function(err, doc) {
        if (err) { res.render('error_page', {error: err}); }
        else if (doc.length) {
            res.render( 'tables_info/questions',
                {
                    list: doc,
                    insertTable: "question"
                }
            );
        }
        else {
            logger.info("No questions found");
            res.render( 'tables_info/questions',
                {
                    list: doc,
                    insertTable: "question"
                }
            );
        }
    });
}

exports.getAnswers = function(req, res) {
    Answers.find({}, function(err, doc) {
        if (err) { res.render('error_page', {error: err}); }
        else if (doc.length) {
            res.render( 'tables_info/answers',
                {
                    list: doc,
                    insertTable: "answer"
                }
            );
        }
        else {
            logger.info("No answers found");
            res.render( 'tables_info/answers',
                {
                    list: doc,
                    insertTable: "answer"
                }
            );
        }
    });
}

exports.getUsers = function(req, res) {
    User.find({}, function(err, doc) {
        if (err) { res.render('error_page', {error: err}); }
        else if (doc.length) {
            res.render( 'tables_info/users',
                {
                    list: doc,
                    insertTable: "user"
                }
            );
        }
        else {
            logger.info("No users found");
            res.render( 'tables_info/users',
                {
                    list: doc,
                    insertTable: "user"
                }
            );
        }
    });
}