const crypto = require('crypto')
const User = require('../models/user')

// User API

exports.createUser = function(reqLogin, reqPassword) {
    const user = {
        login: reqLogin,
        password: hash(reqPassword)
    };
    return new User(user).save()
}

exports.getUser = function(id) {
    return User.findOne(id)
}

exports.checkUser = function(reqLogin, reqPassword) {
    return User
        .findOne({login: reqLogin} )
        .then(function(doc) {
            console.log("Found user - " + doc);
            if (doc.password === hash(reqPassword)) {
                console.log("User password is ok!");
                return Promise.resolve(doc)
            } else {
                return Promise.reject("Error, wrong password!")
            }
        })
}

function hash(text) {
    return crypto.createHash('sha1')
        .update(text).digest('base64')
}