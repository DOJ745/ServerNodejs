//const validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const User = new Schema({

    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true,
        default: 0.0
    }
    /*
    refreshToken: {
        type: String,
        require: true
    } */

});


// ----- Salting password -----
User.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            next();
        });
    });
});

User.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, res) {
        if (err) cb(err);
        cb(null, res);
    });
};

module.exports.UserModel = mongoose.model('User', User);