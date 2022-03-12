const express = require('express');

const router = express.Router();

const Cart = require('../models/cart');
const User = require('../models/user');
const db = require('../db');

router.get('/about', (req, res) => {
  var userName = "Login";

  const userId = req.cookies.userId;
  console.log(userId);

  db.GetById(req.cookies.userId).then(data => {
    if (data) {
        const user = new User(data);
        userName = user.name;
    }
  }).then(function(){
    console.log(userName);
    var productData = [];
    var cart;

    if(req.session.cart){
      cart = new Cart(req.session.cart);
      productData = cart.generateArray(); 
      res.render('about', {
        products: parseInt(productData.length), 
        user: userName});
    }
    else{
      res.render('about', {
      products: parseInt(productData.length), 
      user: userName});
    }
  });
});

module.exports = router;