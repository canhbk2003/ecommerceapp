const db = require('../db');
const Product = require('../models/product');

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
        Product.findOne({ _id: req.params.id }, req.body)
            .then(data => res.render('productdetail', { product: data }))
            .catch(next);
    }
}

module.exports = new ProductController();