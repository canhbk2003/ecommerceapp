const express = require('express');
const router = express.Router();

const Cart = require('../models/cart');
const Bill = require('../models/bill');
const db = require('../db');
 // post and save to db
router.post('/order', (req, res) => {
    // cart
  let userName = "";
  const userId = req.cookies.userId;
  db.GetById(req.cookies.userId).then(data => {
    if (data) {
        const user = new User(data);
        userName = user.name;
    }
  }).then(function(){
    // cart
    if(req.session.cart){
        var cart = new Cart(req.session.cart);
        console.log(cart);

        var name = req.body.guestName;
        var email = req.body.guestEmail;
        var phone = req.body.guestPhone;
        var addr = req.body.guestAddress;
        var note = req.body.orderOptions;
        var offCode = req.body.offCode;
        var paymentState = "";
        var purchaseMethod = req.body.purchase;
        var billId = Math.floor(Math.random() * 10000) + 1;
        if(purchaseMethod === "bank"){
            paymentState = "Thanh toán chuyển khoản ngân hàng"
        }
        else{
            paymentState = "Trả tiền mặt khi giao hàng";
        }
        var object = {
            name: name,
            email: email,
            phone: phone,
            address: addr,
            cart: cart,
            deliveryFee: 30000,
            paymentState: paymentState,
            paymentId: billId,
            options: note,
            offCode: offCode
        }
    
        var bill = new Bill(object);
        console.log(bill);
        db.save_guest_order(bill);
        // guest render
        res.render('order', {bill: bill, user: userName, products: cart.generateArray().length});
    }
    else{
        res.render('order', {bill: {}, user: userName, products: 0});
    }
  });
});

module.exports = router;