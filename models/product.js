const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema({
    productId: { type: String, maxLength: 12 },
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 5000 },
    slogan: {type: String, maxLength: 1000},
    image: { type: String, maxLength: 255 },
    price: { type: Number, min: 0 },
    bonusPrice: { type: Number, min: 0 },
    quantity: { type: Number, min: 1 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

Product.methods.calculateOrder = function(quantity) {
    if (Product.bonusPrice > 0) {
        return quantity * Product.bonusPrice;
    } else {
        return quantity * Product.price;
    }
}

module.exports = mongoose.model('products', Product);