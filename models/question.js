const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Question = new Schema({

    _id: Schema.Types.ObjectId,
    theme_id: {
        type: Schema.Types.ObjectId,
        ref: 'Theme',
        required: true
    },
    difficulty_id: {
        type: Schema.Types.ObjectId,
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

module.exports = mongoose.model('Question', Question);