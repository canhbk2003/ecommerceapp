const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bill = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  cart: {type: Object, require: true},
  address: {type: String, require: true},
  name: {type: String, require: true},
  phone: {type: String, require: true},
  paymentId: {type: String, require: true}
});

module.exports = mongoose.model(
  'bills',
  Bill
);