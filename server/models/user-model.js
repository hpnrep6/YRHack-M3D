const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    contactInfo: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema, 'Users');