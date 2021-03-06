import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Create user model
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    district: {
        type: String,
        required: true,
    },

    registeredDate: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('user', UserSchema);
export default User;