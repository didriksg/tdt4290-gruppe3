const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create user model
const CaseSchema = new Schema({
    priority: {
        type: Number,
        required: true
    },

    isChildType: {
        type: Boolean,
        required: true,
    },

    startupWeek: {
        type: Date,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    district: {
        type: String,
        required: true,
    },

    state: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        required: false,
    },

    userResponsible: {
        type: mongoose.ObjectId,
        required: false,
    },
});


module.exports = User = mongoose.model('case', CaseSchema);