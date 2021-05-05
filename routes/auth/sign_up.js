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

const UserModel = require('../../models/user.js');

const passport = require("passport");
const LocalStrategy  = require('passport-local').Strategy;
const expressSession = require('express-session');

const expressLogger = expressPino({logger});
//const flash = require('flash');

const app = express();

app.use(expressLogger);

// https://blog.rukomoynikov.ru/avtorizatsiya-polzovatelej-express-js-mongo/


router.post('/',
    passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/test_route_get',
        failureFlash : false}));

module.exports = router;
