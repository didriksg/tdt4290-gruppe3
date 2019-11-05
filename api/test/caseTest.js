
const expect = require('chai').expect;
const request = require('supertest');

const app = require('../server');




/*

const CaseSchema = new Schema({
    idNumber: {
        type: String,
        required: true,
    },

    priority: {
        type: Number,
        required: true
    },

    isChildrenCase: {
        type: Boolean,
        required: true,
    },

    startupDate: {
        type: Date,
        required: true,
    },

    registeredDate: {
        type: Date,
        default: Date.now,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    referredFrom: {
        type: String,
        required: false
    },

    district: {
        type: String,
        required: true,
    },

    state: {
        type: Number,
        required: true,
        default: 0,
    },

    important: {
        type: Boolean,
        required: false,
        default: false,
    },

    description: {
        type: String,
        required: false,
    },

    userResponsible: {
        type: mongoose.ObjectId,
        required: false,
    },

    lastChanged: {
        type: Date,
        default: Date.now(),
    },
});


*/