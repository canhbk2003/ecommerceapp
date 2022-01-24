const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bill = new Schema({
  name: {type: String, require: true},
  email: {type: String, require: true},
  phone: {type: String, require: true},
  address: {type: String, require: true},
  cart: {type: Object, require: true},
  state: {type: String, require: true},
  paymentId: {type: String, require: true}, // for online purchase
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model(
  'bills',
  Bill
);