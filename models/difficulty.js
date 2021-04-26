const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Difficulty = new Schema({

    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    multiplier: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Difficulty', Difficulty);