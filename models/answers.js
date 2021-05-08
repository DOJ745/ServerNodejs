const mongoose = require('mongoose');

const autoIncrement = require('mongoose-auto-increment');
const config = require('../config/config');
const connection = mongoose.createConnection(config.db('localhost', 27017, 'know_your_game_db'));

autoIncrement.initialize(connection);

const Schema = mongoose.Schema;

const Answer = new Schema({

    question_id: {
        type: Number,
        ref: 'Question',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    trueness: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('Answers', Answer);