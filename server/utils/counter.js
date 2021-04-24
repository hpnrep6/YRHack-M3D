const mongoose = require('mongoose');
const incrementSchema = require('../models/counter-model');

async function count(name) {
    var doc = await incrementSchema.findByIdAndUpdate(
    name, {$inc: {counter: 1}});

    return doc.counter;
}

module.exports.count = count;