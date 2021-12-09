const express = require('express');
const Product = require('../models/product');

const router = express.Router();

const productController = require('../controllers/product.controller');