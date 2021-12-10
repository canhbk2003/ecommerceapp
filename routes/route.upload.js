const express = require('express');
const router = express.Router();

const authMiddle = require('../middlewares/auth.middleware');

const uploadController = require('../controllers/upload.controller');

// router
router.get('/upload', authMiddle.requireAuth, uploadController.index);
router.post('/upload', authMiddle.requireAuth, uploadController.post);

module.exports = router;