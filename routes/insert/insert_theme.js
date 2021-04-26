const express = require('express');
const router = express.Router();

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

const Models = require('../../models/theme');

router.post('/', function(req, res, next) {

    if(req.query.name != null) {
       var theme = new Models.ThemeModel({name: req.query.name});
    }
    theme.save(function (err) {
        if(err)
            return console.log(err);
        else {
            logger.info("Theme successfully inserted!");
            res.send({success: "yes"});
        }
    });
});

module.exports = router;