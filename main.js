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
const testRouterGet = require('./routes/test/test_route_get');
const testRouterPost = require('./routes/test/test_route_post');
const testSignUp = require('./routes/test/test_sign_up');
const testSignIn = require('./routes/test/test_sign_in');

// ----- CRUD Routes -----

    // ----- Insert -----
const InsertTheme = require('./routes/insert/insert_theme');
const InsertDifficulty = require('./routes/insert/insert_difficulty');

    // ----- Update -----

    // ----- Delete -----
const signUp = require('./routes/auth/sign_up');
const signIn = require('./routes/auth/sign_in');

app.use(expressLogger);

app.use(session({
    secret: 'this is not these droids',
    resave: false,
    saveUninitialized: false,
    // Место хранения сессии
    store: MongoStore.create({
        mongoUrl: config.db('localhost', 27017, 'know_your_game_db'),
    })
}))

// ----- URL of routes -----

    // ----- Test Routes -----
app.use("/test_route_get", testRouterGet);
app.use("/test_route_post", testRouterPost);
app.use("/test_sign_up", testSignUp);
app.use("/test_sign_in", testSignIn);

    // ----- Insert -----
app.use("/insert_theme", InsertTheme);
app.use("/insert_difficulty", InsertDifficulty);

    // ----- Update -----

    // ----- Delete -----

    // ----- Authorization -----

app.use("/sign_up", signUp);
app.use("/sign_in", signIn);

app.use(express.static(__dirname + "/pages"));

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

    // ----- Passport init -----

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
    /*
    const url = "mongodb://localhost:27017/";
    const mongoClient = new MongoClient(url, { useUnifiedTopology: true });

    mongoClient.connect(function(err, client){

        const db = client.db("usersdb");
        const collection = db.collection("users");

        if(err) return console.log(err);

        collection.find({age: 23}).
        toArray(function(err, results){
            console.log(results);
            client.close();
        });

        let user = {name: "Tom", age: 23};
        let users = [
            {name: "Bob", age: 25},
            {name: "Goroh", age: 40},
            {name: "Blob", age: 13} ];

        collection.insertMany(users, function (err, result){
            if(err){ return console.log(err); }
            console.log(result.ops);
            client.close();
        } );


        collection.insertOne(user, function(err, result){

            if(err){ return console.log(err); }
            console.log(result.ops);
            client.close();
        });
    });*/