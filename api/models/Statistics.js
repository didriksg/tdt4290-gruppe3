const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatisticsSchema = new Schema({});

module.exports = Statistics = mongoose.model('statistics', StatisticsSchema);