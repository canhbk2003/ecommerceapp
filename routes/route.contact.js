const express = require('express');
const router = express.Router();
const db = require('../db');
const User = require('../models/user');
const Cart = require('../models/cart');

router.get('/contact', (req, res) => {
  let userName = "Login";
  const userId = req.cookies.userId;
  if(userId !== ''){
    db.GetById(req.cookies.userId).then(data => {
      if (data) {
          const user = new User(data);
          userName = user.name;
      }
    });
  }

  // query all data
  db.QueryAllProduct().then(data_ => {
      var _numitems = data_.length / 9;
      if (_numitems < 1) {
          _numitems = 1;
      }
      _numitems = _numitems + 1;
      var dpData = [];
        var productData = [];
        var cart;
        if (data_.length > 0) {
            dpData.length = 0;
            for (var i = 0; i < 9; i++) {
                if (data_[i] !== undefined) {
                    dpData.push(data_[i]);
                }
            }

            if(req.session.cart){
                cart = new Cart(req.session.cart);
                productData = cart.generateArray(); 
                res.render('contact', { 
                    numItems: parseInt(_numitems), 
                    product: dpData,  
                    products: parseInt(productData.length), 
                    user: userName});
            }
            else{
                res.render('contact', { 
                    numItems: parseInt(_numitems), 
                    product: dpData,  
                    products: parseInt(productData.length), 
                    user: userName});
            }
            
        } 
        else {
            if(req.session.cart){
                cart = new Cart(req.session.cart);
                productData = cart.generateArray(); 
                res.render('contact', { 
                    numItems: parseInt(_numitems), 
                    product: {},  
                    products: parseInt(productData.length), 
                    user: userName});
            }
            else{
                res.render('contact', { 
                    numItems: parseInt(_numitems), 
                    product: {},  
                    products: parseInt(productData.length), 
                    user: userName});
            }
        }
  });
});

module.exports = router;