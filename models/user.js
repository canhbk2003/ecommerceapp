const mongoose = require('mongoose');
// for encrypt password
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const User = new Schema({
    userId: { type: String, maxLength: 8 },
    name: { type: String, maxLength: 256 },
    password: { type: String, maxLength: 256 },
    addr: { type: String, maxLength: 256 },
    email: { type: String, maxLength: 256 },
    phone: { type: String, maxLength: 30 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

User.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('administrators', User);