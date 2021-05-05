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
});


// ----- Salting password -----

/*
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
});*/

// ----- User API -----

User.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, res) {
        if (err) cb(err);
        cb(null, res);
    });
};

User.methods.getUser = function(login) {
    return User.findOne(login)
}

User.methods.createUser = function(userData){
    const user = {
        login: userData.name,
        password: hash(userData.password)
    };
    return new User(user).save();
}

User.methods.checkUser = function(userData) {
    return User
        .findOne({login: userData.login})
        .then(function(doc) {
            if (doc.password === hash(userData.password)) {
                console.log("User password is ok");
                return Promise.resolve(doc)
            } else {
                return Promise.reject("Error wrong")
            }
        })
}

function hash(text) {
    return crypto.createHash('sha1')
        .update(text).digest('base64');
}

module.exports = mongoose.model('User', User);