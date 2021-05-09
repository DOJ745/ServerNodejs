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

const UserModel = require('../../models/user');

router.get('/', function(req, res, next) {
    logger.info("[Status code : " + req.baseUrl + "] - " + res.statusCode + "\n");

    /*UserModel.findOne({login: "test"}, function(err, doc) {

        if(err) return console.log(err);

        res.send(doc)
    });*/
    res.send(req.query.url);
});

module.exports = router;