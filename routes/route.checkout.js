const express = require('express');
const router = express.Router();

const Cart = require('../models/cart');
const Checkout = require('../models/checkout');
const db = require('../db');
const User = require('../models/user');

router.get('/checkout', (req, res)=>{
   res.render('checkout');
});

router.post('/checkout/:id', (req, res) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  const sizeName  = req.params.size;
  const msg = req.params.msg;
  const numItems = req.params.qty;


  let userName = "";
  const userId = req.cookies.userId;
  db.GetById(req.cookies.userId).then(data => {
    if (data) {
        const user = new User(data);
        userName = user.name;
    }
  }).then(function(){
    var deliveryFree = req.body.deliveryFee;
      var object = {
          cart: cart,
          deliveryFee: deliveryFree,
          checkoutId: null
      }
      var checkout = new Checkout(object);
      console.log(checkout);
      // guest render
      res.render('checkout', {
        checkout: checkout, 
        user: userName,
          products: cart.generateArray().length, 
          __products__: cart.generateArray(),
          totalPrice: cart.totalPrice, });
  });
});

router.post('/checkout', (req, res) => {
  // cart
  let userName = "";
    const userId = req.cookies.userId;
    db.GetById(req.cookies.userId).then(data => {
      if (data) {
          const user = new User(data);
          userName = user.name;
      }
    }).then(function(){
      if(req.session.cart){
        var cart = new Cart(req.session.cart);
        console.log(cart);
  
        var deliveryFree = req.body.deliveryFee;
  
        var object = {
            cart: cart,
            deliveryFee: deliveryFree,
            checkoutId: null
        }
        var checkout = new Checkout(object);
        console.log(checkout);
        // guest render
        res.render('checkout', {
          checkout: checkout, 
          user: userName,
           products: cart.generateArray().length, 
           __products__: cart.generateArray(),
           totalPrice: cart.totalPrice, });
      }
      else{
          res.render('checkout', {
            checkout: {},
             user: userName,
              products: 0,
               __products__: null,
               totalPrice: 0,});
      }
    });
});

module.exports = router;