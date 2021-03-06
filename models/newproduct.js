const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewProduct = new Schema({
    productId: { type: String, maxLength: 8 },
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 1000 },
    image: { type: String, maxLength: 255 },
    price: { type: Number, min: 0 },
    bonusPrice: { type: Number, min: 0 },
    quantity: { type: Number, min: 1 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: {type: String, default: 'newer'}
});
NewProduct.methods.calculateOrder = function(quantity) {
    if (NewProduct.bonusPrice > 0) {
        return quantity * NewProduct.bonusPrice;
    } else {
        return quantity * NewProduct.price;
    }
}


module.exports = mongoose.model('newproducts', NewProduct);