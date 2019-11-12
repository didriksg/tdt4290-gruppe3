import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Create case model
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

    referral: {
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

    userResponsible: {
        type: mongoose.ObjectId,
        required: false,
    },

    createdBy: {
        type: mongoose.ObjectId,
        required: false, //TODO: Make this required field
    },

    lastChanged: {
        type: Date,
        default: Date.now(),
    },
});


const Case = mongoose.model('case', CaseSchema);
export default Case;