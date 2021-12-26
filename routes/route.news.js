const express = require('express');
const db = require('../db.js');
const User = require('../models/user');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

// @TODO: news controller
router.get('/news', (req, res, next) => {
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
      if (data_.length > 0) {
          dpData.length = 0;
          for (var i = 0; i < 9; i++) {
              if (data_[i] !== undefined) {
                  dpData.push(data_[i]);
              }
          }

          res.render('news', { numItems: parseInt(_numitems), product: dpData, user: userName});
      } else {
          res.render('news', { numItems: parseInt(_numitems), product: {}, user: userName});
      }
  });
});

module.exports = router;