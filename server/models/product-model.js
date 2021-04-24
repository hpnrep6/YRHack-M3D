const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    model: {
        type: String
    }
});

module.exports = mongoose.model('Product', ProductSchema, 'Products');