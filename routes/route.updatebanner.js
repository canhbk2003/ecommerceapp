const express = require('express');
const router = express.Router();

const authMiddle = require('../middlewares/auth.middleware');

const updateBannerController = require('../controllers/updatebanner.controller');

// router
router.get('/uploadbanner', authMiddle.requireAuth, updateBannerController.get);
router.post('/uploadbanner', authMiddle.requireAuth, updateBannerController.post);

module.exports = router;