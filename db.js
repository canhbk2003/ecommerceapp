const mongoose = require('mongoose');
const path = require('path');
const Product = require('./models/product');
const User = require('./models/user');
const Image = require('./models/upload');
const logger = require('./log/logger');
const fs = require('fs');

exports.GetById = async function QueryById(id) {
    const uri = 'mongodb://127.0.0.1:27017/product_test';

    try {
        await mongoose.connect(uri, {
            connectTimeoutMS: 1000
        });
        logger.info('Connect to database successfully!');
    } catch (err) {
        logger.error('Connect to database failed!');
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
    // @TODO: reset email
}

exports.AddOneProduct = async function addOne(_product) {
    const URI = 'mongodb://127.0.0.1:27017/product_test';

    try {
        await mongoose.connect(URI, {
            connectTimeoutMS: 1000
        });
        logger.info('Connect to database successfully!');
    } catch (err) {
        logger.error('Connect to db failed');
    }

    const product = new Product(_product);
    logger.info(product);
    return await product.save().then(err => {
        if (!err) {
            logger.info('Save model successfully!');
        } else {
            logger.error('Save model failed!');
        }
    });
}

exports.AddOneUser = async function addOneUser(_user) {
    const URI = 'mongodb://127.0.0.1:27017/product_test';

    try {
        await mongoose.connect(URI, {
            connectTimeoutMS: 1000
        });
        logger.info('Connect to database successfully!');
    } catch (err) {
        logger.error(err);
    }
    const user = new User(_user);
    // encrypt user
    user.password = user.encryptPassword(user.password);
    logger.info(user);
    return await user.save().then(err => {
        if (!err) {
            logger.info('Save model successfully');
        }
    });
}

exports.FindByProductId = async function findProductById(id) {
    const URI = 'mongodb://127.0.0.1:27017/product_test';

    try {
        await mongoose.connect(URI, {
            connectTimeoutMS: 1000
        });
        logger.info('Connect to database successfully!');
    } catch (err) {
        logger.error(`Connect to database failed! -> ${err}`);
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
        logger.info('Connect to database successfully!');
    } catch (err) {
        logger.error(`Connect to database failed! -> ${err}`);
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
        logger.info('Connect to database successfully!');
    } catch (err) {
        logger.error(`Connect to database failed! -> ${err}`);
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
        logger.info('Connect to database successfully!');
    } catch (err) {
        logger.error(`Connect to database failed! -> ${err}`);
        return;
    }

    return await User.findOne({ 'name': name })
        .then(doc => {
            return doc;
        });
}

exports.Upload = async function upload(files){
    const uri = 'mongodb://127.0.0.1:27017/product_test';
    try{
        // connect db
        await mongoose.connect(uri, {
            connectTimeoutMS: 1000
        });
        logger.info('connect to db successfully');
        const upload_path = path.join(__dirname, './upload/');
        const root_path = path.join(__dirname, './pubic/products');
        // save model
        for(var i=0;i<files.length;i++){
            var _url = upload_path+files[i];
            var Img = {
                name: files[i],
                url: _url
            };
            const img = new Image(Img);
            await img.save().then(err => {
                if(err){
                    logger.error(err);
                }
                // copy file into products directory
                var root_url = root_path + files[i];
                fs.copyFile(_url, root_url, (err) => {
                    if (err) throw err;
                });
            });
        }
    }
    catch(err){
        logger.error(`connect db failed: ${err}`);
    }
}

exports.updatebanner = async function updatebanner(){

}

exports.queryByPageNumber = async function query(page_number){
    var max_value = 10*page_number-2; // 18
    var min_value = max_value-9; // 9

    const URI = 'mongodb://127.0.0.1:27017/product_test';

    try {
        await mongoose.connect(URI, {
            connectTimeoutMS: 1000
        });
        logger.info('Connect to database successfully!');
    } catch (err) {
        logger.error(`Connect to database failed! -> ${err}`);
    }

    let data = [];
    return await Product.find({})
        .then(docs => {
            for(var i=min_value;i<=max_value;i++){
                if(docs[i] !== undefined){
                    data.push(docs[i]);
                }
            }
            return data;
        });
}

exports.queryImages = async function(){
    const uri = 'mongodb://127.0.0.1:27017/product_test';
    try{
        await mongoose.connect(uri, {
            connectTimeoutMS: 1000
        });
        return await Image.find({})
        .then(docs => {
            return docs;
        });
    }
    catch(err){
        logger.error(err);
    }
}

exports.readfile = async function readfile(){
    var arrayObject = [];
    var folder_name = path.join(__dirname, '/public/banner/');
    var files = fs.readdirSync(folder_name);

    for (var i = 0; i < files.length; i++) {
        console.log(files[i]);
        var file = {
            url: files[i]
        };

        arrayObject.push(file);
    }
    // return array of file object
    return arrayObject;
}

exports.find_by_product_code = async function find_by_product_code(code){
    const uri = 'mongodb://127.0.0.1:27017/product_test';
    try{
        await mongoose.connect(uri, {
            connectTimeoutMS: 1000
        });
        return await Image.find({productId: code})
        .then(docs => {
            return docs;
        });
    }
    catch(err){
        logger.error(err);
    }
}

// save guest order data
exports.save_guest_order = async function save_guest_order(order){
    const uri = 'mongodb://127.0.0.1:27017/product_test';
    try{
        await mongoose.connect(uri, {
            connectTimeoutMS: 1000
        });
        return await order.save().then(err => {
            logger.error(err);
        });
    }
    catch(err){
        logger.error(err);
    }
}