const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Question = new Schema({

    _id: Number,
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
    }
});

module.exports.QuestionModel = mongoose.model('Question', Question);