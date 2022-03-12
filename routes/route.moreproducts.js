const express = require('express');
const db = require('../db.js');
const User = require('../models/user');
const Cart = require('../models/cart');
const authMiddleware = require('../middlewares/auth.middleware');
const { resolveInclude } = require('ejs');
const router = express.Router();

const PageController = require('../controllers/pagination.controller');

router.get('/moreproducts', PageController.RenderMoreProduct);
router.get('/moreproducts/page=:page', PageController.RenderMoreProductByPage);

module.exports = router;