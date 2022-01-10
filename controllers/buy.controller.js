const db = require('../db');
const Product = require('../models/product');

class BuyController {
    postBuyNow(req, res, next) {
        res.render('buynow');
    }
    postOrder(req, res, next){
        res.render('order');
    }
    getOrder(req,res, next){
        res.send("Get order page");
    }
}

module.exports = new BuyController();