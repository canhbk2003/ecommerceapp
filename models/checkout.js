const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Checkout = new Schema({
  cart: {type: Object, require: true},
  DeliveryFee: {type: Number, require: true},
  checkoutId: {type: String, require: true}, // for online purchase
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model(
  'checkout',
  Checkout
);