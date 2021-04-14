// ----- Libraries -----

    // ----- Main libs -----
const express = require('express');
const body_parser = require('body-parser');

    // ----- Lib for generating errors -----
const createError = require('http-errors');

const path = require('path');

    // ----- Folders with classes -----
const queryProcessing = require('./middlewares/queryProcessing');
const config = require('./config/config');

    // ----- Lib for MongoDB -----
const mongoDB = require('mongodb');
const MongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose');

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
    config.db('localhost', 27017, 'usersdb'),
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
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
const testRouterGet = require('./routes/test_route_get');
const testRouterPost = require('./routes/test_route_post');
const signUp = require('./routes/sign_up');

app.use(expressLogger);
app.use("/test_route_get", testRouterGet);
app.use("/test_route_post", testRouterPost);
app.use("/register_user", signUp);

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

/*
// ----- Handle CORS requests -----
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

app.get("/", function(request, response){
    response.send("<h1>About site</h1>");
    logger.debug("[Status code : " + request.baseUrl + "] - " + response.statusCode + "\n");
});

// create application/json parser
var jsonParser = body_parser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = body_parser.urlencoded({ extended: false })


app.listen(config.app.port, function () {
    logger.info('Server listening on port: ' + config.app.port);
});

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
