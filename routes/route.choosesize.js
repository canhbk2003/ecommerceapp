const express = require('express');

const router = express.Router();

const Cart = require('../models/cart');
const User = require('../models/user');
const db = require('../db');

router.get('/guide-choosesize', (req, res) => {
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

  var productData = [];
  var cart;

  if(req.session.cart){
    cart = new Cart(req.session.cart);
    productData = cart.generateArray(); 
    res.render('guide-choosesize', {
      products: parseInt(productData.length), 
      user: userName});
  }
  else{
    res.render('guide-choosesize', {
    products: parseInt(productData.length), 
    user: userName});
  }
});

module.exports = router;