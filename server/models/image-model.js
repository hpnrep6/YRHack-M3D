const mongoose = require('mongoose');

const Image = mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    data: {
        type: String,
        data: Buffer
    }
});

module.exports = mongoose.model('Image', Image, 'Images');