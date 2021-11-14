const mongoose = require('mongoose');

exports.connectAndQueryAll = async function query() {
    console.log('connect to mongoose db');
    const URI = 'mongodb://127.0.0.1:27017/admin';
    await mongoose.connect(URI, {
        connectTimeoutMS: 1000
    });
    console.log('ready state -> ' +
        `${mongoose.connection.readyState}`);
    var schema = mongoose.Schema;
    var UserSchema = new schema({
        userId: String,
        name: String,
        age: String,
        addr: String,
        email: String,
        phone: String
    });
    let UserModel;
    try {
        UserModel = mongoose.model('UserModel');
    } catch (error) {
        UserModel = mongoose.model('UserModel', UserSchema, 'administrator');
    }
    return await UserModel.find().then(data => {
        return data;
    }); // find all
}

exports.GetById = async function QueryById(id) {

}

exports.GetByName = async function QueryByName(name) {

}

exports.ResetEmail = async function ResetEmail(email) {
    const uri = 'mongodb://127.0.0.1:27017/admin';
    await mongoose.connect(uri, {
        connectTimeoutMS: 1000
    });
    var schema = mongoose.Schema;
    var UserSchema = new schema({
        userId: String,
        name: String,
        age: String,
        addr: String,
        email: String,
        phone: String
    });
    let user;
    try {
        user = mongoose.model('UserModel');

    } catch (error) {
        user = mongoose.model('UserModel', UserSchema, 'administrator');
    }

    return await user.findOne({ 'email': email }).then(data => {
        return data;
    });
}

exports.GetByEmail = async email => {
    const uri = 'mongodb://127.0.0.1:27017/admin';
    await mongoose.connect(uri, {
        connectTimeoutMS: 1000
    });
    var schema = mongoose.Schema;
    var UserSchema = new schema({
        userId: String,
        name: String,
        age: String,
        addr: String,
        email: String,
        phone: String
    });
    let user;
    try {
        user = mongoose.model('UserModel');

    } catch (error) {
        user = mongoose.model('UserModel', UserSchema, 'administrator');
    }

    return await user.findOne({ 'email': email }).then(data => {
        return data;
    });
}