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
        if (err) { res.send(err); }
        else if (doc.length) {
            res.render( 'themes', {list: doc} );
        }
        else { res.send('No themes found'); }
    });
}

exports.getDifficulties = function(req, res) {
    Difficulty.find({}, function(err, doc) {
        if (err) { res.send(err); }
        else if (doc.length) {
            res.render( 'difficulties', {list: doc} );
        }
        else { res.send('No difficulties found'); }
    });
}

exports.getLeagues = function(req, res) {
    League.find({}, function(err, doc) {
        if (err) { res.send(err); }
        else if (doc.length) {
            res.render( 'leagues', {list: doc} );
        }
        else { res.send('No leagues found'); }
    });
}

exports.getQuestions = function(req, res) {
    Question.find({}, function(err, doc) {
        if (err) { res.send(err); }
        else if (doc.length) {
            res.render( 'questions', {list: doc} );
        }
        else { res.send('No questions found'); }
    });
}

exports.getAnswers = function(req, res) {
    Answers.find({}, function(err, doc) {
        if (err) { res.send(err); }
        else if (doc.length) {
            res.render( 'answers', {list: doc} );
        }
        else { res.send('No answers found'); }
    });
}

exports.getUsers = function(req, res){
    User.find({}, function(err, doc) {
        if (err) { res.send(err); }
        else if (doc.length) {
            res.render( 'auth/users', {list: doc} );
        }
        else { res.send('No users found'); }
    });
}