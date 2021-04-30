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

const UserModel = require('../../models/user.js');

router.get('/', function(req, res, next) {

    let sentUserLogin = req.query.login;
    let sentUserPassword = req.query.password;

    logger.debug("Sent info (login + password): " + sentUserLogin + " - " + sentUserPassword);

});

module.exports = router;