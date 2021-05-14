const crypto = require('crypto');
const User = require('../models/user');
// User API

const Session = require('../models/session');

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

    Session.findByIdAndDelete(id, function(err, session) {
        if(err) {
            console.log("\n*** Error with finding session!\n" + err);
        }
        else{ console.log("\n*** Session has been deleted ***: " + session); }
    });
}

exports.deleteUser = function (reqLogin, res) {

    User.findOneAndDelete(
        {login: reqLogin},
        function (err, delObj) {
        if(err) {
            res.render('error_page', {error: err});
            return console.log("\n*** Error with deleting user!\n" + err);
        }
        else {
            console.log("\n*** User successfully deleted!\n");
            res.render('crud_info', {
                title: "User delete status",
                upd: delObj,
                backTo: "users",
                crud_type: "Delete"
            });
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
                res.render('error_page', {error: err});
                return console.log("\n*** Error with updating user!\n" + err);
            }
            else {
                console.log("\n*** User successfully updated!\n");
                res.render('crud_info', {
                    title: "User update status",
                    upd: updObj,
                    backTo: "users",
                    crud_type: "Update"
                });
            }
    });
}

function hash(text) {
    return crypto.createHash('sha1').update(text).digest('base64');
}