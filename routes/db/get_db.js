const express = require('express');
const router = express.Router();

const Theme = require('../../models/user');
const Answers = require('../../models/answers');
const Question = require('../../models/question');
const Difficulty = require('../../models/difficulty');
const League = require('../../models/league');

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



router.get('/', function(req, res, next) {
    res.send({"developing?": "yes"});
});

module.exports = router;