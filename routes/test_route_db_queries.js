const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const Models = require('../models/theme');

const test_theme = new Models.ThemeModel({name: 'testTheme3'} );

router.post('/', function(req, res, next) {

    test_theme.save(function (err) {
        if(err)
            return console.log(err);
        else
            logger.info("Theme successfully inserted!");
    });
    res.write("<h2>Success!</h2>");
});

module.exports = router;