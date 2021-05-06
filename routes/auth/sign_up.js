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

    api.createUser(req.query.login, req.query.password)
        .then(function() {
            logger.debug("User successfully created!");
            res.status(200).send({"status": "Success registration"});
        })
        .catch(function(err) {
            if (err) {
                res.send({"status": "Error - This user already exist"});
            }
        })
});

module.exports = router;