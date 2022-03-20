// sale off code
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OffCode = new Schema({
  name: {type: String, require: true},
  value: {type: Number, require: true},
  date: {type: Date, default: Date.now}
});

OffCode.methods.getOffCode = function(code){
  if(OffCode.name == code){
    return OffCode.value;
  }
  return 0;
}

module.exports = mongoose.model(
  'offcode',
  OffCode
);