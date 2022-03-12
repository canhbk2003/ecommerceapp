const db = require('../db');
const { data } = require('../log/logger');

const logger = require('../log/logger');

const User = require('../models/user');

class PageController{

  // for home
  RenderMoreProductByPage(req, res, next){
    var _numitems;
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
          res.render('moreproducts', { numPage: parseInt(_numitems), products: 0, product: data, user: "" });
        }
      );
    });
  }

  RenderMoreProduct(req, res, next){
    let userName = "Login";
    db.GetById(req.cookies.userId).then(data => {
      if (data) {
          const user = new User(data);
          userName = user.name;
      }
    }).then(function(){
      db.QueryAllProduct().then(
        function(data){
          let _numPage = data.length / 12 < 1 ? 1 : data.length/12+1;
          res.render('moreproducts', { numPage: parseInt(_numPage), products: 0, product: data, user: userName });
        }
      );
    }); 
  }

  // for new arrivals
  RenderByPage(req, res, next){
    var _numitems;
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
          res.render('newarrivals', { numPage: parseInt(data.length), products: 0, product: data, user: "" });
        }
      );
    });
  }

  Render(req, res, next){
    let userName = "Login";
    db.GetById(req.cookies.userId).then(data => {
      if (data) {
          const user = new User(data);
          userName = user.name;
      }
    }).then(function(){
      db.QueryAllProduct().then(
        function(data){
          let _numPage = data.length/12 < 1 ? 1 : data.length/12+1;
          res.render('newarrivals', { numPage: parseInt(_numPage), products: 0, product: data, user: userName });
        }
      );
    });   
  }
}

module.exports = new PageController();