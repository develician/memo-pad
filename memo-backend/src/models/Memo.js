const mongoose = require('mongoose');

const { Schema } = mongoose;

const memo = new Schema({
    content: String,
    email: String,
    updated: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Memo', memo);