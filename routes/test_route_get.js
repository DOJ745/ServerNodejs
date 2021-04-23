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

router.get('/', function(req, res, next) {
    res.send({
        "data": "Hello! It is me, GET response!",
        "info": "1234"
    } );
    logger.info("[Status code : " + req.baseUrl + "] - " + res.statusCode + "\n");
});

module.exports = router;