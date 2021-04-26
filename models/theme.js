const mongoose = require('mongoose');

const autoIncrement = require('mongoose-auto-increment');
const config = require('../config/config');
const connection = mongoose.createConnection(config.db('localhost', 27017, 'know_your_game_db'));

autoIncrement.initialize(connection);

const Schema = mongoose.Schema;

const Theme = new Schema({

    name: {
        type: String,
        required: true
    }
});

Theme.plugin(autoIncrement.plugin, 'Theme');
module.exports.ThemeModel = mongoose.model('Theme', Theme);