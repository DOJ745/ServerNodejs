const mongoose = require('mongoose');

const autoIncrement = require('mongoose-auto-increment');
const config = require('../config/config');
const connection = mongoose.createConnection(config.db('localhost', 27017, 'know_your_game_db'));

autoIncrement.initialize(connection);

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
League.plugin(autoIncrement.plugin, 'League');
module.exports = mongoose.model('League', League);