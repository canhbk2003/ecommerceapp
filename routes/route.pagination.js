const express = require('express');
const router = express.Router();

const pageController = require('../controllers/pagination.controller');

router.get('/:page', pageController.RenderByPage);

module.exports = router;