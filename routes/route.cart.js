const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.get('/carts/add-to-cart/:id', cartController.addToCart);

router.get('/carts/reduce/:id', cartController.reduce);

router.get('/carts/remove/:id', cartController.remove);

router.get('/carts', cartController.index);

module.exports = router;