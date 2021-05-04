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
//app.use(flash);
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.login);
});

passport.deserializeUser(function(login, done) {
    UserModel.findById(login, function(err, user) {
        done(err, user);
    });
});

passport.use('signup', new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password'
    },
    function(req, username, password, done) {
        let findOrCreateUser = function () {

            // Поиск пользователя в Mongo с помощью предоставленного имени пользователя
            UserModel.findOne({'login': username}, function (err, user) {
                // В случае любых ошибок - возврат
                if (err) {
                    console.log('Error in SignUp: ' + err);
                    return done(err);
                }
                // Пользователь уже существует
                if (user) {
                    console.log('User already exists!');
                    return done(null, false);
                } else {
                    // Если пользователя с таким логином
                    // в базе не существует, то создаем нового
                    var newUser = new UserModel({
                        login: req.query.login,
                        password: req.query.password
                    });

                    // Сохранения пользователя
                    newUser.save(function (err) {
                        if (err) {
                            logger.error('Error in Saving user: ' + err);
                            throw err;
                        }
                        logger.info('User Registration successful');
                        return done(null, newUser);
                    });
                }
            });
        };

        // Отложить исполнение findOrCreateUser и выполнить
        // метод на следующем этапе цикла события
        process.nextTick(findOrCreateUser);
    })
);

router.post('/',
    passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/test_route_get',
        failureFlash : false}));

module.exports = router;


/*
var checkUser;
if(req.query.login != null && req.query.password != null) {

    var newUser = new UserModel({
        login: req.query.login,
        password: req.query.password
    });

    logger.debug("Sent info (login + password): " +
        req.query.login + " - " + req.query.password);

    UserModel.findOne({login: req.query.login}, function(err, doc) {
        if(err) return console.log(err);
        logger.debug("Found user - " + doc);
        checkUser = doc;
        //res.send(checkUser);
    });
}

if(checkUser._id === req.query.login){
    res.send({"suchUserAlreadyExists": "true"});
}


newUser.save(function (err) {
    if(err)
        return console.log(err);
    else {
        logger.info("User successfully inserted!");

        // Returning User DTO
        UserModel.findOne({login: req.query.login}, function(err, doc) {
            if(err) return console.log(err);
            res.send(doc);
        });
    }
});*/