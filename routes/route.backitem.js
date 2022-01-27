const express = require('express');

const router = express.Router();

router.get('/guide.backitem', (req, res) => {
  res.render('guide.backitem');
});

module.exports = router;