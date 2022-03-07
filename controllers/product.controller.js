const db = require('../db');
const Product = require('../models/product');
const Cart = require('../models/cart');
const User = require('../models/user');

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
        var productData = [];
        var cart;
        if(req.session.cart){
            cart = new Cart(req.session.cart);
            productData = cart.generateArray();
        }
        
        let query = "";
        Product.findOne({_id: req.params.id }, req.body)
        .then(data => {
            console.log(data);
            const pId = data.productId;
            query = [pId];
            Product.find({"productId":{$in: query}})
            .then(
                data => res.render('productdetail', { product: data, user: userName , products: parseInt(productData.length)})
            )
            .catch(next);
        })
        .catch(next);     
    }
}

module.exports = new ProductController();