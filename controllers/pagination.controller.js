const db = require('../db');
const { data } = require('../log/logger');

const logger = require('../log/logger');

const User = require('../models/user');
const Cart = require('../models/cart');
class PageController{

  // for home
  RenderMoreProductByPage(req, res, next){
    var _numitems;
    var cart;

    let userName = "";
    db.GetById(req.cookies.userId).then(data => {
      if (data) {
          const user = new User(data);
          userName = user.name;
      }
    }).then(function(){
      db.QueryAllProduct().then(data_ => {
        _numitems = data_.length / 12;
        if (_numitems < 1) {
            _numitems = 1;
        }
        else{
          _numitems = _numitems + 1;
        }
      }).then(function(){
        const page_number = req.params.page;
        db.queryByPageNumber(page_number).then(
          data => {
            // add cart items
            if(req.session.cart){
              cart = new Cart(req.session.cart);
              res.render('moreproducts', { numPage: parseInt(_numitems), products: parseInt(cart.generateArray().length), product: data, user: userName});
            }else{
              res.render('moreproducts', { numPage: parseInt(_numitems), products: 0, product: data, user: userName });
            }
          }
        );
      });
    });    
  }

  RenderMoreProduct(req, res, next){
    let userName = "";
    var cart;
    db.GetById(req.cookies.userId).then(data => {
      if (data) {
          const user = new User(data);
          userName = user.name;
      }
    }).then(function(){
      db.QueryAllProduct().then(
        function(data){
          // add cart items
          let _numPage = data.length / 12 < 1 ? 1 : data.length/12+1;
          if(req.session.cart){
            cart = new Cart(req.session.cart);
            res.render('moreproducts', { numPage: parseInt(_numPage), products: parseInt(cart.generateArray().length), product: data, user: userName });
          }else{
            res.render('moreproducts', { numPage: parseInt(_numPage), products: 0, product: data, user: userName });
          }
        }
      );
    }); 
  }

  // for new arrivals
  RenderByPage(req, res, next){
    var _numitems;
    let userName = "";
    var cart;
    db.GetById(req.cookies.userId).then(data => {
      if (data) {
          const user = new User(data);
          userName = user.name;
      }
    }).then(function(){
      db.QueryAllProduct().then(data_ => {
        _numitems = data_.length / 12;
        if (_numitems < 1) {
            _numitems = 1;
        }
        _numitems = _numitems + 1;
      }).then(function(){
        const page_number = req.params.page;
        db.queryByPageNumber(page_number).then(
          data => {
            // add cart items
            if(req.session.cart){
              cart = new Cart(req.session.cart);
              res.render('newarrivals', { numPage: parseInt(_numitems), products: parseInt(cart.generateArray().length), product: data, user: userName });
            }else{
              res.render('newarrivals', { numPage: parseInt(_numitems), products: 0, product: data, user: userName });
            }
          }
        );
      });
    });
  }

  Render(req, res, next){
    let userName = "";
    var cart;
    db.GetById(req.cookies.userId).then(data => {
      if (data) {
          const user = new User(data);
          userName = user.name;
      }
    }).then(function(){
      db.QueryAllProduct().then(
        function(data){
          // add cart item
          let _numPage = data.length/12 < 1 ? 1 : data.length/12+1;
          if(req.session.cart){
            cart = new Cart(req.session.cart);
            res.render('newarrivals', { numPage: parseInt(_numPage), products: parseInt(cart.generateArray().length), product: data, user: userName });
          }else{
            res.render('newarrivals', { numPage: parseInt(_numPage), products: 0, product: data, user: userName });
          }
        }
      );
    });   
  }
}

module.exports = new PageController();