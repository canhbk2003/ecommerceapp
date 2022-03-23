// quan ly tat ca don hang
const db = require('../db');
const Product = require('../models/product');
const Cart = require('../models/cart');
const User = require('../models/user');
const Bill = require('../models/bill')

class BillController{
    // require authenticate

    getBillTable(req, res, next){
        db.get_all_bill()
        .then(data => {
            res.render('orders', { bill: data});
        });
    }
    postBillPage(req, res, next){

    }
    editById(req, res, next){

    }
    deleteById(req, res, next){
        Bill.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
    }
}

module.exports = new BillController();