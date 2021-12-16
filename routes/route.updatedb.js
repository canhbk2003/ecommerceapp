const express = require('express');

const router = express.Router();

const authMiddle = require('../middlewares/auth.middleware');
const updateController = require('../controllers/updatedb.controller');

router.get('/updatedb', authMiddle.requireAuth, updateController.index);

router.post('/updatedb', authMiddle.requireAuth, updateController.post);

module.exports = router;