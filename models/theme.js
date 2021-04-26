const mongoose = require('mongoose');
/*const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection("mongodb://localhost:27017/know_your_game_db");
autoIncrement.initialize(connection);*/
//const incrementPlugin = require('../main.js');
const {increment} = require("../main");
const Schema = mongoose.Schema;

const Theme = new Schema({

    name: {
        type: String,
        required: true
    }
});

Theme.plugin(increment.plugin, 'Theme');
module.exports.ThemeModel = mongoose.model('Theme', Theme);