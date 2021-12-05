const mongoose = require('mongoose');

const Product = require('./models/product');
const User = require('./models/user');

exports.GetById = async function QueryById(id) {
    const uri = 'mongodb://127.0.0.1:27017/product_test';

    try {
        await mongoose.connect(uri, {
            connectTimeoutMS: 1000
        });
        console.log('Connect to database successfully!');
    } catch (err) {
        console.log('Connect to database failed!');
        return;
    }

    return await User.findOne({ 'userId': id })
        .then(doc => {
            return doc;
        })
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

exports.AddOneProduct = async function addOne(_product) {
    const URI = 'mongodb://127.0.0.1:27017/product_test';

    try {
        await mongoose.connect(URI, {
            connectTimeoutMS: 1000
        });
        console.log('Connect to database successfully!');
    } catch (err) {

    }

    const product = new Product(_product);
    console.log(product);
    return await product.save().then(err => {
        if (!err) {
            console.log('Save model successfully');
        }
    });
}

exports.AddOneUser = async function addOneUser(_user) {
    const URI = 'mongodb://127.0.0.1:27017/product_test';

    try {
        await mongoose.connect(URI, {
            connectTimeoutMS: 1000
        });
        console.log('Connect to database successfully!');
    } catch (err) {

    }
    const user = new User(_user);
    // encrypt user
    user.password = user.encryptPassword(user.password);
    console.log(user);
    return await user.save().then(err => {
        if (!err) {
            console.log('Save model successfully');
        }
    });
}

exports.FindByProductId = async function findProductById(id) {
    const URI = 'mongodb://127.0.0.1:27017/product_test';

    try {
        await mongoose.connect(URI, {
            connectTimeoutMS: 1000
        });
        console.log('Connect to database successfully!');
    } catch (err) {
        console.log('Connect to database failed!');
    }

    return await Product.findOne({ 'productId': id }).then(data => {
        return data;
    });
}

exports.QueryAllProduct = async function queryAllProduct() {
    const URI = 'mongodb://127.0.0.1:27017/product_test';

    try {
        await mongoose.connect(URI, {
            connectTimeoutMS: 1000
        });
        console.log('Connect to database successfully!');
    } catch (err) {
        console.log('Connect to database failed!');
    }

    return await Product.find({})
        .then(docs => {
            return docs;
        });
}

exports.QueryAllUser = async function queryAllUser() {
    const uri = 'mongodb://127.0.0.1:27017/product_test';

    try {
        await mongoose.connect(uri, {
            connectTimeoutMS: 1000
        });
        console.log('Connect to database successfully!');
    } catch (err) {
        console.log('Connect to database failed!');
    }

    return await User.find({})
        .then(docs => {
            return docs;
        })
}

exports.QueryOneUser = async function queryOneUser(name) {
    const uri = 'mongodb://127.0.0.1:27017/product_test';

    try {
        await mongoose.connect(uri, {
            connectTimeoutMS: 1000
        });
        console.log('Connect to database successfully!');
    } catch (err) {
        console.log('Connect to database failed!');
        return;
    }

    return await User.findOne({ 'name': name })
        .then(doc => {
            return doc;
        })
}