const express = require('express');
const User = require('../models/user');
const userController = require('../controllers/user.controller');
const router = express.Router();

const authMiddle = require('../middlewares/auth.middleware');

// router
router.get('/admin', authMiddle.requireAuth, userController.getAdminPage);
router.get('/edituser', authMiddle.requireAuth, userController.getEditUser);
router.put('/edituser/:id', authMiddle.requireAuth, userController.putEditUser);
router.delete('/admin/:id', authMiddle.requireAuth, userController.deleteUser);

router.get('/adduser', authMiddle.requireAuth, userController.getAddUser);
router.post('/adduser', authMiddle.requireAuth, userController.postAddUser);

router.get('/changepassword', authMiddle.requireAuth, userController.getChangePassword);
router.put('/changepassword', authMiddle.requireAuth, userController.putChangePassword);

router.get('/signup', userController.getSignup);
router.post('/signup', userController.postSignup);