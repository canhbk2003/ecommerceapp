const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    userId: { type: String, maxLength: 8 },
    name: { type: String, maxLength: 256 },
    password: { type: String, maxLength: 256 },
    age: { type: Number, maxLength: 3 },
    addr: { type: String, maxLength: 256 },
    email: { type: String, maxLength: 256 },
    phone: { type: String, maxLength: 30 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('administrator', User);