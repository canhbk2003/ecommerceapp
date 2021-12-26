const express = require('express');

const router = express.Router();

router.get('/uploaddbnotify', function(req, res, next){
  res.render('uploaddbnotify');
});

module.exports = router;