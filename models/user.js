const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model('User', User);