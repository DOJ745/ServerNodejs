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

exports.getThemes = function() {
    var themeList = {}
    Theme.find({},function (err, doc) {
        if(err) {
            return console.log(err);
        }
        else {
            logger.info("Theme list:\n" + doc);
            themeList.themes = doc;
        }
    });
    return themeList;
}