const express = require('express');
const db_insert_router = require('../get_db');

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

db_insert_router.post('/theme:name', function(req, res, next) {

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
});

//module.exports = router;