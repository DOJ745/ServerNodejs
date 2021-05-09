// ----- Libraries -----

    // ----- Main libs -----
const express = require('express');
const body_parser = require('body-parser');

    // ----- Lib for generating errors -----
const createError = require('http-errors');

const path = require('path');

    // ----- Folders with classes -----
const config = require('./config/config');

    // ----- Lib for MongoDB -----
const mongoDB = require('mongodb');
const MongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose');

    // ----- Authorization -----
const session = require('express-session')
const MongoStore = require('connect-mongo');

    // ----- Logger -----
const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({
    level: process.env.LOG_LEVEL || 'debug',
    prettyPrint: {
        colorize: true
    }
} );

const expressLogger = expressPino({logger});

// Set up MongoDB

mongoose.connect(
    config.db('localhost', 27017, 'know_your_game_db'),
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

mongoose.connection.on("open", () => {
    logger.debug("Connected to mongo server.");
});

mongoose.connection.on("error", (err) => {
    logger.error("Could not connect to mongo server! " + err);
});

const app = express();

// ----- Routes -----

    // ----- Test routes -----
const testRouterGet = require('./routes/test/test_route_get');
const testRouterPost = require('./routes/test/test_route_post');

// ----- CRUD Routes -----

    // ----- DB Routes -----
const DB_ROUTES = require('./routes/db/get_db');

    // ----- Authorization Routes -----
const SignUp = require('./routes/auth/sign_up');
const SignIn = require('./routes/auth/sign_in');
const Logout = require('./routes/auth/log_out');

app.use(expressLogger);

app.use(session({
    secret: 'this is not these droids',
    resave: false,
    saveUninitialized: false,
    // Место хранения сессии
    store: MongoStore.create({
        mongoUrl: config.db('localhost', 27017, 'know_your_game_db'),
    })
}));

// ----- URL of routes -----

    // ----- Test Routes -----
app.use("/test_route_get", testRouterGet);
app.use("/test_route_post", testRouterPost);

    // ----- Authorization -----
app.use("/sign_up", SignUp);
app.use("/sign_in", SignIn);
app.use("/logout", Logout);

app.use("/db", DB_ROUTES);

app.use(express.static(__dirname + "/pages"));

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

/*
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());*/

// ----- Handle CORS requests -----
/*
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Request-Method', 'GET, POST, PUT, DELETE');
    }
    next();
});

// ----- Error handling -----
app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.status(err.status).json({
        message: err.message
    });
});*/

app.get("/", function(request, response) {
    response.sendFile(__dirname + '/pages/index.html', createError(404, "Page not found!"));
    logger.info("[Status code : " + request.baseUrl + "] - " + response.statusCode + "\n");
});

app.listen(config.app.port, function () {
    logger.info('Server listening on port: ' + config.app.port);
});

module.exports = app;