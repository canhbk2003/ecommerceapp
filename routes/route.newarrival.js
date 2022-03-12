const express = require('express');
const db = require('../db.js');
const User = require('../models/user');
const Cart = require('../models/cart');
const authMiddleware = require('../middlewares/auth.middleware');
const { resolveInclude } = require('ejs');
const router = express.Router();

const pageController = require('../controllers/pagination.controller')

router.get('/newarrivals', pageController.Render);

// router.get('/newarrivals', (req, res, next) => {
//   let userName = "Login";
//   const userId = req.cookies.userId;
//   db.GetById(req.cookies.userId).then(data => {
//     if (data) {
//         const user = new User(data);
//         userName = user.name;
//     }
//   }).then(function() {
//     // query all data
//     db.QueryAllProduct().then(data_ => {
//         var dpData = [];
//         var productData = [];
//         var cart;
//         if (data_.length > 0) {
//             dpData.length = 0;
//             for (var i = 0; i < 9; i++) {
//                 if (data_[i] !== undefined) {
//                     dpData.push(data_[i]);
//                 }
//             }
            
//             getNumberPage(pageController).then(function(data){
//                 console.log(data);
//             });
        
//             if(req.session.cart){
//                 cart = new Cart(req.session.cart);
//                 //productData = cart.generateArray(); 
//                 generateData(cart).then(function(data){
//                     res.render('newarrivals', {  
//                         product: dpData,  
//                         products: parseInt(data.length), 
//                         user: userName,
//                         numPage: 1
//                     });
//                 });      
//             }
//             else{
//                 res.render('newarrivals', { 
//                     product: dpData,  
//                     products: 0, 
//                     user: userName,
//                     numPage: 1
//                 });
//             }
            
//         } 
//         else {
//             if(req.session.cart){
//                 cart = new Cart(req.session.cart);
//                 productData = cart.generateArray(); 
//                 res.render('newarrivals', {
//                     product: {},  
//                     products: parseInt(productData.length), 
//                     user: userName,
//                     numPage: 1
//                 });
//             }
//             else{
//                 res.render('newarrivals', {
//                     product: {},  
//                     products: 0, 
//                     user: userName,
//                     numPage: 1
//                 });
//             }
//         }
//     });
//   });
// });

module.exports = router;