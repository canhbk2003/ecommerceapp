const express = require('express');
const router = express.Router();
const authMiddle = require('../middlewares/auth.middleware');

const BillController = require('../controllers/bill.controller');

// router.get('/orders', (req, res) => {
//   res.render('orders');
// });

router.get('/orders', authMiddle.requireAuth, BillController.getBillTable);
router.delete('/orders/:id', authMiddle.requireAuth, BillController.deleteById);

module.exports = router;
