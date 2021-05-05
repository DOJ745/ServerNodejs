const api = require("../../user_api");

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

    if (req.session.user) return res.redirect('/')

    api.checkUser(req.query.login, req.query.password)
        .then(function(user) {
            if(user) {
                req.session.user = {id: user._id, login: user.login}
                //res.redirect('/');
            } else {
                return next()
            }
        })
        .catch(function(error){
            return next(error);
        });
});

module.exports = router;