const express = require('express');
const router = express.Router();

const Cart = require('../models/cart');
const Bill = require('../models/bill');
const db = require('../db');
router.get('/order', (req, res)=>{
   res.render('order');
});
 // post and save to db
router.post('/order', (req, res) => {
    // cart
    if(req.session.cart){
        var cart = new Cart(req.session.cart);
        console.log(cart);

        var name = req.body.guestName;
        var email = req.body.guestEmail;
        var phone = req.body.guestPhone;
        var addr = req.body.guestAddress;

        var object = {
            name: name,
            email: email,
            phone: phone,
            address: addr,
            cart: cart,
            paymentId: null
        }
        var bill = new Bill(object);
        console.log(bill);
        db.save_guest_order(bill);
        // guest render
        res.render('order', {bill: bill});
    }
    else{
        res.render('order', {bill: {}});
    }
});

module.exports = router;