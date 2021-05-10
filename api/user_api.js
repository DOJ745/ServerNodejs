const crypto = require('crypto');
const User = require('../models/user');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User API
const sessionScheme = new Schema({_id: String});
const Session = mongoose.model('Session', sessionScheme);

exports.createUser = function(reqLogin, reqPassword) {
    const user = {
        login: reqLogin,
        password: hash(reqPassword)
    };
    return new User(user).save();
}

exports.getUserByLogin = function(reqLogin, res) {

    User.findOne(
        {login: reqLogin},
        function(err, user) {
        if (err)
            console.log("Error with getting user!\n" + err);
        console.log("Found user BY LOGIN:\n" + user);
        res.send(user);
    });
}

let errorUser = {login: "error", password: "error"};

exports.checkUser = function(reqLogin, reqPassword, req, res) {

    User.findOne(
        {login: reqLogin},
        function (err, user) {

        if(err) { console.log("Error with getting user!\n" + err); }
        if(user.password === hash(reqPassword)) {
            req.session.user = {id: user._id, login: user.login}
            console.log("\n*** User password is ok! You are entered in! ***\n");
            res.send(user);
        }
        else{ res.send(errorUser);}
    })
}

exports.logoutUser = function (id) {

    Session.findByIdAndDelete(
        {_id: id},
        function(err, session) {

        if(err) { console.log("\n*** Error with finding session!\n" + err); }
        console.log("\n*** Session has been deleted ***: " + session);
    })
}

exports.deleteUser = function (reqLogin, res) {

    User.findOneAndDelete(
        {login: reqLogin},
        function (err, delObj) {
        if(err) {
            res.send({isDeleted: 1, error: err, object: "none"});
            return console.log("\n*** Error with deleting user!\n" + err);
        }
        else {
            console.log("\n*** User successfully deleted!\n");
            res.send({isDeleted: 0, error: "none", object: delObj});
        }
    });
}

exports.updateUser = function (reqLogin, reqScore, res) {

    User.findOneAndUpdate(
        {login:reqLogin},
        {score: reqScore},
        {new: true},
        function (err, updObj) {

            if(err) {
                res.send({isUpdated: 1, error: err, object: "none"});
                return console.log("\n*** Error with updating user!\n" + err);
            }
            else {
                console.log("\n*** User successfully updated!\n");
                res.send({isUpdated: 0, error: "none", object: updObj});
            }
    });
}

function hash(text) {
    return crypto.createHash('sha1').update(text).digest('base64');
}