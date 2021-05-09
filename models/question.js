const mongoose = require('mongoose');

const autoIncrement = require('mongoose-auto-increment');
const config = require('../config/config');
const connection = mongoose.createConnection(config.db('localhost', 27017, 'know_your_game_db'));

autoIncrement.initialize(connection);

const Schema = mongoose.Schema;

const Question = new Schema({

    theme_id: {
        type: Number,
        ref: 'Theme',
        required: true
    },
    difficulty_id: {
        type: Number,
        ref: 'Difficulty',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true,
        default: 30
    }
});

Question.plugin(autoIncrement.plugin, 'Question');
module.exports = mongoose.model('Question', Question);