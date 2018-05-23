const mongoose = require('mongoose');

const { Schema } = mongoose;

const crypto = require('crypto');

function hash(password) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}

const account = new Schema({
    email: String,
    password: String,
    username: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

account.statics.findByEmail = function(email) {
    return this.findOne({email}).exec();
}

account.statics.register = function({email, password}) {
    
    const account = new this({
        email,
        username: email.split("@")[0],
        password: hash(password)
    });

    return account.save();
}

module.exports = mongoose.model('Account', account);