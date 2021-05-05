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
}

function hash(text) {
    return crypto.createHash('sha1').update(text).digest('base64');
}