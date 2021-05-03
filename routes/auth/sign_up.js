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

const expressLogger = expressPino({logger});

const app = express();
app.use(expressLogger);

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    UserModel.findById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/', function(req, res, next) {

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            findOrCreateUser = function(){
                // поиск пользователя в Mongo с помощью предоставленного имени пользователя
                UserModel.findOne({'login':username},function(err, user) {
                    // В случае любых ошибок - возврат
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // уже существует
                    if (user) {
                        console.log('User already exists');
                        return done(null, false,
                            req.flash('message','User Already Exists'));
                    } else {
                        // если пользователя с таки адресом электронной почты
                        // в базе не существует, создать пользователя
                        var newUser = new User();
                        // установка локальных прав доступа пользователя
                        newUser.username = username;
                        newUser.password = createHash(password);
                        newUser.email = req.param('email');
                        newUser.firstName = req.param('firstName');
                        newUser.lastName = req.param('lastName');

                        // сохранения пользователя
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);
                                throw err;
                            }
                            console.log('User Registration succesful');
                            return done(null, newUser);
                        });
                    }
                });
            };

            // Отложить исполнение findOrCreateUser и выполнить
            // метод на следующем этапе цикла события
            process.nextTick(findOrCreateUser);
        });
);
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
});

module.exports = router;