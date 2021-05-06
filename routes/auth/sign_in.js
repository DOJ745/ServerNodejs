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
        logger.debug("\n*** You are still logged in! ***\n");
        res.send({"login": 1} );
    }

    /*
    api.checkUser(req.query.login, req.query.password)
        .then(function(user) {
            if(user) {
                req.session.user = {id: user._id, login: user.login}
                api.getUserByLogin(req.query.login, res);
            } else {
                return next();
            }
        })
        .catch(function(error) {
            logger.error("Error occurred!\n" + error);
            return next(error);
        });*/

    api.checkUser(req.query.login, req.query.password, req, res);
});

module.exports = router;