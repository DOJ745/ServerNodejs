const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Answers = new Schema({

    _id: Schema.Types.ObjectId,
    question_id: {
        type: Schema.Types.ObjectId,
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

module.exports = mongoose.model('Answers', Answers);