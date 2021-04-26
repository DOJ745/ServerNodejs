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
        type: Number,
        required: true
    }

});

module.exports.LeagueModel = mongoose.model('League', League);