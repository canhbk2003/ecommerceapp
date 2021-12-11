const mongoose = require('mongoose');

const logger = require('../log/logger');
// validate email
exports.valid = function valid(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// auto generate user email
exports.autogenkey = function genkey() {

}

exports.opendb = async function connect() {
    const URI = 'mongodb://127.0.0.1:27017/admin';
    try {
        await mongoose.connect(URI, {
            connectTimeoutMS: 1000
        });
        logger.info('Connect to database successfully!');
    } catch (err) {
        logger.error(`Connect to database failed -> ${err}`);
    }
}

// verify user input