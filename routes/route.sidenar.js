const express = require('express');

const router = express.Router();

router.get('/sidenar', function(req, res, next){
  res.render('sidenar');
});

module.exports = router;