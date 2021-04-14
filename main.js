    // Libraries
const express = require('express');
const body_parser = require('body-parser');
const mongoDB = require('mongodb');
const MongoClient = require("mongodb").MongoClient;

var app = express();

    // Routes
var testRouterGet = require('./routes/test_route_get');
var testRouterPost = require('./routes/test_route_post');
var registerUserPost = require('./routes/register_user');

app.use("/test_route_get", testRouterGet);
app.use("/test_route_post", testRouterPost);
app.use("/register_user", registerUserPost);

app.get("/", function(request, response){
    response.send("<h1>About site</h1>");
    console.log("[Status code : " + request.baseUrl + "] - " + response.statusCode + "\n");
});

// create application/json parser
    var jsonParser = body_parser.json()

    // create application/x-www-form-urlencoded parser
    var urlencodedParser = body_parser.urlencoded({ extended: false })


const PORT = 8000;
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

app.listen(PORT, function (){
    console.log("App listen port: " + PORT);
});