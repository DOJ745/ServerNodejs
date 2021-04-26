const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const League = new Schema({

    name: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Schema.Types.Number,
        required: true
    }

});

module.exports = mongoose.model('League', League);