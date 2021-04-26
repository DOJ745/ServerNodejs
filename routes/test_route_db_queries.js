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

const connection = mongoose.createConnection('mongodb://localhost:27017/know_your_game_db.themes');
const ThemeModel = connection.model('Theme');
const test_theme = new ThemeModel({name: 'testTheme'});

router.post('/', function(req, res, next) {

    test_theme.save(function (err) {
        if(err)
            return console.log(err);
        else
            logger.info("Theme successfully inserted!");
    });
    //if(res.statusCode === 200)
    res.send({
        "id": test_theme._id
    });
});

module.exports = router;