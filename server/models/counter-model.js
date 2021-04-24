const mongoose = require('mongoose');

const CounterSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
    }, counter: {
        type: Number,
        default: 1
    }    
}, {
    versionKey: false
});

module.exports = mongoose.model('Counter', CounterSchema, 'Counters');