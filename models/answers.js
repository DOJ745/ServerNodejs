const mongoose = require('mongoose');
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

module.exports.AnswerModel = mongoose.model('Answers', Answer);