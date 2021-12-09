// variables
const express = require('express');
const Product = require('../models/product');
const router = express.Router();
const productController = require('../controllers/product.controller');
const authMiddle = require('../middlewares/auth.middleware');

// router
router.get('/producttable', authMiddle.requireAuth, productController.getProductPage);
router.get('/editproduct/:id', authMiddle.requireAuth, productController.getProductById);
router.put('/editproduct/:id', authMiddle.requireAuth, productController.updateProduct);
router.delete('/producttable/:id', authMiddle.requireAuth, productController.deleteProductById);
router.get('/productdetail/:id', productController.getProductDetailPage);

module.exports = router;