const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bill = new Schema({
  name: {type: String, require: true},
  email: {type: String, require: true},
  phone: {type: String, require: true},
  address: {type: String, require: true},
  cart: {type: Object, require: true},
  deliveryFee: {type: Number, require: true},
  paymentState: {type: String, require: true}, // online purchase or offline
  paymentId: {type: String, require: true}, // for online purchase
  options: {type: String, require: false},
  offCode: {type: String, require: false},
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model(
  'bills',
  Bill
);