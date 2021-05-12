const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Session = new Schema({_id: String});

module.exports = mongoose.model('Session', Session);