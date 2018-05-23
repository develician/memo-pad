const mongoose = require('mongoose');

const { Schema } = mongoose;

const memo = new Schema({
    content: String,
    email: String,
    updated: {
        type: Boolean,
        default: false
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Memo', memo);