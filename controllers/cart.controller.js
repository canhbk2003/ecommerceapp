const db = require('../db');
const Product = require('../models/product');
const logger = require('../log/logger');
const Cart = require('../models/cart');

class CartController{
  index(req, res ){
    if(!req.session.cart) {
      return res.render('carts', {__products__: null});
    }
    const cart = new Cart(req.session.cart);
    return res.render('carts', {__products__: cart.generateArray(), totalPrice: cart.totalPrice});
  }
  addToCart(req, res ){
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    const sizeName  = req.params.size;
    const msg = req.params.msg;

    const numItems = req.params.qty;

    Product.findById(productId, function (err, product) {
        if(err) {
            return res.redirect('/');
        }
        cart.add(product, product.id, sizeName, msg, numItems);
        req.session.cart = cart;
        res.redirect('/');
    });
  }
  reduce (req, res ){
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/carts');
  }
  addone (req, res ){
    
  }
  remove (req, res, ){
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/carts');
  }
}

module.exports = new CartController();