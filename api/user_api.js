const crypto = require('crypto');
const User = require('../models/user');

// User API


exports.createUser = function(reqLogin, reqPassword) {
    const user = {
        login: reqLogin,
        password: hash(reqPassword)
    };
    return new User(user).save();
}

exports.getUserByLogin = function(reqLogin, res) {
    User.findOne({login: reqLogin}, function(err, user) {
        if (err)
            console.log("Error with getting user!\n" + err);
        console.log("Found user BY LOGIN:\n" + user);
        res.send(user);
    });
}

let errorUser = {login: "error", password: "error"};
/*
exports.checkUser = function(reqLogin, reqPassword) {
    return User.findOne({login: reqLogin} )
        .then(function(doc) {
            console.log("Found user - " + doc);
            if (doc.password === hash(reqPassword)) {
                console.log("User password is ok! You are entered in!");
                return doc;//Promise.resolve(doc);
            } else {
                return Promise.reject("Error, wrong password!");
            }
        })
}*/

exports.checkUser = function(reqLogin, reqPassword, req, res) {
    User.findOne({login: reqLogin}, function (err, user) {

        if(err) { console.log("Error with getting user!\n" + err); }
        if(user.password === hash(reqPassword)) {
            req.session.user = {id: user._id, login: user.login}
            console.log("\n*** User password is ok! You are entered in! ***\n");
            res.send(user);
        }
        else{ res.send(errorUser);}
    })
}

exports.logoutUser = function (req, res) {

}

function hash(text) {
    return crypto.createHash('sha1').update(text).digest('base64');
}