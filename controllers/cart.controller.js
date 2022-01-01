const db = require('../db');
const Product = require('../models/product');
const logger = require('../log/logger');
const Cart = require('../models/cart');

class CartController{
  index(req, res ){
    console.log(req.session.cart);
    if(!req.session.cart) {
      return res.render('carts', {products: null});
    }
    const cart = new Cart(req.session.cart);
    console.log(cart.generateArray());
    return res.render('carts', {products: cart.generateArray(), totalPrice: cart.totalPrice});
  }
  addToCart(req, res ){
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function (err, product) {
        if(err) {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
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
  remove (req, res, ){
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/carts');
  }
}

module.exports = new CartController();