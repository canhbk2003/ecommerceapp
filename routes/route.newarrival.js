const express = require('express');
const db = require('../db.js');
const User = require('../models/user');
const Cart = require('../models/cart');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/newarrivals', (req, res, next) => {
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
                res.render('newarrivals', {  
                    product: dpData,  
                    products: parseInt(productData.length), 
                    user: userName});
            }
            else{
                res.render('newarrivals', { 
                    product: dpData,  
                    products: 0, 
                    user: userName});
            }
            
        } 
        else {
            if(req.session.cart){
                cart = new Cart(req.session.cart);
                productData = cart.generateArray(); 
                res.render('newarrivals', {
                    product: {},  
                    products: parseInt(productData.length), 
                    user: userName});
            }
            else{
                res.render('newarrivals', {
                    product: {},  
                    products: 0, 
                    user: userName});
            }
        }
  });
});

module.exports = router;