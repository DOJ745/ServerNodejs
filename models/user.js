//const validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const User = new Schema({

    _id: Schema.Types.ObjectId,

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
        default: 0
    }
    /*
    refreshToken: {
        type: String,
        require: true
    }

    __v: {
        type: Number,
        select: false
    }*/
});

/*
User.path('login').validate((login) => {
    if (validator.isLength(login, { min: 4, max: 100 })) {
        return true;
    } else {
        throw new Error('Entity of LOGIN(length) too large (> 100) or too small (< 4)');
    }
});

User.path('password').validate((password) => {
    if (validator.isLength(password, { min: 6, max: 100 })) {
        return true;
    }
    else {
        throw new Error('Entity of PASSWORD(length) too large (> 100) or too small (< 6)');
    }
});

*/

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