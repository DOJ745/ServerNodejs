const mongoose = require('mongoose');

const autoIncrement = require('mongoose-auto-increment');
const config = require('../config/config');
const connection = mongoose.createConnection(config.db('localhost', 27017, 'know_your_game_db'));

autoIncrement.initialize(connection);

const Schema = mongoose.Schema;

const Log = new Schema({

    login: { type: String },
    answerStatus: { type: Number },
    points: { type: Number },
    date: { type: String }
});

Log.plugin(autoIncrement.plugin, 'Log');
module.exports = mongoose.model('Log', Log);