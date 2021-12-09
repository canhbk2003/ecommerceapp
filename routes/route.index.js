const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const querystring = require('querystring');

const methodOverride = require('method-override');

const url = require('url');
const http = require('http');

const db = require('../db.js');
const util = require('../utils/util.js');

const Product = require('../models/product');
const User = require('../models/user');

const cookieParser = require('cookie-parser');

const authMiddleware = require('../middlewares/auth.middleware');

const authController = require('../controllers/auth.controller');

const { application } = require('express');
const { type } = require('os');

const routerAuth = require('./route.login');

function route(app) {
    // home page
    app.get('/', function(req, res) {
        // check if have login user -> display user name
        var userName = "Đăng nhập";
        if (authMiddleware.requireAuth) {
            const userId = req.cookies.userId;
            console.log('home cookie: ' + userId);
            db.GetById(req.cookies.userId).then(data => {
                if (data) {
                    const user = new User(data);
                    userName = user.name;
                }
            });
        }

        // query all data
        db.QueryAllProduct().then(data_ => {
            var numitems = data_.length / 12;
            if (numitems < 1) {
                numitems = 1;
            }
            res.render('index', { numItems: parseInt(numitems), product: data_, user: userName });
        });
    });

    app.get('/home', authMiddleware.releaseAuth, function(req, res) {
        var userName = "Đăng nhập";

        // query all data
        db.QueryAllProduct().then(data_ => {
            var numitems = data_.length / 12;
            if (numitems < 1) {
                numitems = 1;
            }
            res.render('home', { numItems: parseInt(numitems), product: data_, user: userName });
        });
    });

    app.get('/contact', function(req, res) {
        res.render('contact');
    });

    // app.get('/edituser', function(req, res) {
    //     res.render('edituser');
    // });

    // app.get('/admin', authMiddleware.requireAuth, function(req, res, next) {

    //     db.QueryAllUser().then(data => res.render('admin', {
    //         data: data
    //     }));
    // });

    // app.get('/reset', function(req, res) {
    //     res.render('reset');
    // });

    app.post('/reset', async function(req, res) {
        var email = req.body.editEmail;
        if (!util.valid(email)) {
            res.send('EMAIL IS INVALID!');
        }
        let dat;
        try {
            await db.ResetEmail(email).then(data => {
                dat = data;
            });
        } catch (err) {

        }

        if (dat === null) {
            res.send('User not found!');
        } else {
            res.send(email);
        }
    });

    // app.get('/changepassword', function(req, res) {
    //     res.render('changepassword');
    // });

    // app.put('/changepassword', async function(req, res) {
    //     // get user with password

    // });

    // app.get('/signup', function(req, res) {
    //     res.render('signup');
    // });

    app.post('/signup', function(req, res, next) {
        var isChecked = Boolean(req.body.agreeCheck);
        if (isChecked == false) {
            next();
        }

        res.send(isChecked);

        next();
    }, function(req, res, next) {
        res.redirect('/');
    });

    app.post('/updateuser', function(req, res) {
        res.send('update user called!');
    });

    // product information
    app.get('/addproduct', authMiddleware.requireAuth, function(req, res) {
        res.render('addproduct');
    });

    app.post('/addproduct', async function(req, res, next) {
        next();
    }, async function(req, res, next) {

        const formData = req.body;
        let docs = null;
        try {
            await db.FindByProductId(req.body.productId).then(data => {
                docs = data;
            });
        } catch (err) {

        }
        if (docs == null) {
            await db.AddOneProduct(formData);
        }
        res.render('addproduct');
    });

    app.get('/producttable', function(req, res) {

        db.QueryAllProduct().then(data_ => {
            res.render('producttable', { data: data_ });
        });
    });

    app.get('/editproduct/:id', function(req, res, next) {
        Product.findById(req.params.id)
            .then(data => res.render('editproduct', {
                product: data
            }))
            .catch(next);
    });

    app.put('/editproduct/:id', function(req, res, next) {
        Product.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/producttable'))
            .catch(next)
    });

    app.delete('/producttable/:id', function(req, res, next) {
        Product.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    });

    app.get('/productdetail/:id', function(req, res, next) {
        Product.findOne({ _id: req.params.id }, req.body)
            .then(data => res.render('productdetail', { product: data }))
            .catch(next);
    });

    // user information
    // app.get('/edituser/:id', function(req, res, next) {
    //     User.findById(req.params.id)
    //         .then(data => res.render('edituser', {
    //             user: data
    //         }))
    //         .catch(next)
    // });

    // app.get('/adduser', function(req, res, nex) {
    //     res.render('adduser');
    // });

    // app.post('/adduser', function(req, res, next) {
    //     try {
    //         db.AddOneUser(req.body);
    //     } catch (err) {
    //         console.log(err);
    //     }

    //     res.render('adduser');
    // });

    // app.put('/edituser/:id', function(req, res, next) {
    //     User.updateOne({ _id: req.params.id }, req.body)
    //         .then(() => res.redirect('/admin'))
    //         .catch(next)
    // });

    // app.delete('/admin/:id', function(req, res, next) {
    //     User.deleteOne({ _id: req.params.id })
    //         .then(() => res.render('back'))
    //         .catch(next)
    // });

    // order information
    app.post('/buynow/:id', function(req, res, next) {
        console.log(req.body.quantity);
        res.render('buynow');
    });

    // sending email from customer
    app.get('/sendemail', function(req, res, next) {
        res.render('sendemail');
    });

    // summary
    app.get('/summary', function(req, res, next) {
        res.render('summary');
    });

    // campaign
    app.get('/campaign', function(req, res, next) {
        res.render('campaign');
    });

    // not found
    app.get('/notfound404', function(req, res, next) {
        res.render('notfound404');
    });


    app.use('/', routerAuth);

}

module.exports = route;