const api = require("../../api/user_api");

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

router.post('/', function(req, res, next) {
    if (req.session.user) {
        api.logoutUser(req.sessionID);
        delete req.session.user;
        logger.debug("User successfully log out!");
        res.send({"logout": 0});
    }
});

module.exports = router;