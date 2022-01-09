const express = require('express');

const router = express.Router();

router.get('/order', (req, res)=>{
   res.render('order');
});

router.post('/order', (req, res) => {
    res.render('order');
});

module.exports = router;