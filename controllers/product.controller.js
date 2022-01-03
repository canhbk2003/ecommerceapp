const db = require('../db');
const Product = require('../models/product');
const Cart = require('../models/cart');

class ProductController {
    // product table
    getProductPage(req, res, next) {
        db.QueryAllProduct()
            .then(data_ => {
                res.render('producttable', { data: data_ });
            });
        }
        // update product
    getProductById(req, res, next) {
        Product.findById(req.params.id)
            .then(data => res.render('editproduct', {
                product: data
            }))
            .catch(next);
    }

    updateProduct(req, res, next) {

    }

    deleteProductById(req, res, next) {

    }

    getProductDetailPage(req, res, next) {
        let userName = "Login";
        const userId = req.cookies.userId;
        if(userId !== ''){
          db.GetById(req.cookies.userId).then(data => {
            if (data) {
                const user = new User(data);
                userName = user.name;
            }
          });
        }
        if(req.session.cart){
            var cart = new Cart(req.session.cart);
        }
        Product.findOne({ _id: req.params.id }, req.body)
            .then(data => res.render('productdetail', { product: data, user: userName , products: req.session.cart? cart.generateArray(): {}}))
            .catch(next);
    }
}

module.exports = new ProductController();