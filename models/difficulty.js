const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection("mongodb://localhost:27017/know_your_game_db");
autoIncrement.initialize(connection);

const Schema = mongoose.Schema;

const Difficulty = new Schema({

    name: {
        type: String,
        required: true
    },
    multiplier: {
        type: String,
        required: true
    }

});

Difficulty.plugin(autoIncrement.plugin, 'Difficulty');
module.exports.DifficultyModel = mongoose.model('Difficulty', Difficulty);