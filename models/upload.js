const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Image = new Schema({
  name: {type: String, maxLength: 128},
  url: {type: String, maxLength: 128},
  createAt: {type: Date, defaule: Date.now}
});

module.exports = mongoose.model('images', Image);