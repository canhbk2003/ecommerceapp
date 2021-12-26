const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bill = new Schema({

});

module.exports = mongoose.model(
  'bills',
  Bill
);