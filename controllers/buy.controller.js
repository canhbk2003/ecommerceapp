const db = require('../db');
const Product = require('../models/product');

class BuyController {
    postBuyNow(req, res, next) {
        res.render('buynow');
    }
}

module.exports = new BuyController();