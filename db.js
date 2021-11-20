const mongoose = require('mongoose');

const Product = require('./models/product');

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

exports.AddOneProduct = async function addOne(_product){
    const URI = 'mongodb://127.0.0.1:27017/product_test';

    try{
        await mongoose.connect(URI, {
            connectTimeoutMS: 1000
        }); 
        console.log('Connect to database successfully!');
    }catch(err){

    }

    const product = new Product(_product);
    console.log(product);

    // product.save().then(function(err){
    //     if(!err){
    //         console.log('Save model successfully!');
    //     }
    // }).catch(err => handleError(err)).finally(()=>{
    //     console.log('close db');
    // });
    return await product.save().then(err=>{
        if(!err){
            console.log('Save model successfully');
        }
    });
}

exports.FindByProductId = async function findProductById(id){
    const URI = 'mongodb://127.0.0.1:27017/product_test';

    try{
        await mongoose.connect(URI, {
            connectTimeoutMS: 1000
        }); 
        console.log('Connect to database successfully!');
    }catch(err){
        console.log('Connect to database failed!');
    }

    // console.log(id);
    // // promise
    // Product.findOne({productId: id})
    //     .then(docs => {
    //         return docs;
    //     }).catch(err => handleError(err)).finally(() => {console.log('close db')});
    return await Product.findOne({ 'productId': id }).then(data => {
        return data;
    });
}

exports.QueryAllProduct = async function queryAllProduct(){
    const URI = 'mongodb://127.0.0.1:27017/product_test';

    try{
        await mongoose.connect(URI, {
            connectTimeoutMS: 1000
        }); 
        console.log('Connect to database successfully!');
    }catch(err){
        console.log('Connect to database failed!');
    }

    return await Product.find({})
    .then(docs => {
        console.log(docs);
        return docs;
    });
}