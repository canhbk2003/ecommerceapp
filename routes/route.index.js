const express = require('express');
const db = require('../db.js');
const util = require('../utils/util.js');
const User = require('../models/user');
const authMiddleware = require('../middlewares/auth.middleware');
const routerAuth = require('./route.login');
const routerUser = require('./route.user');
const routerProduct = require('./route.product');
const routerUpload = require('./route.upload');
const routerUpdateDb = require('./route.updatedb');
const routerPagination = require('./route.pagination');
const routerUpdateBanner = require('./route.updatebanner');
const routerUploadNotify = require('./route.uploadnotify');
const routerNewArrival = require('./route.newarrival');
const routerNews = require('./route.news');

const logger = require('../log/logger');

function route(app) { 
    // home page
    app.get('/', function(req, res) {
        // check if have login user -> display user name
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
        // query all data
        db.QueryAllProduct().then(data_ => {
            var _numitems = data_.length / 9;
            if (_numitems < 1) {
                _numitems = 1;
            }
            _numitems = _numitems + 1;
            var dpData = [];
            if (data_.length > 0) {
                dpData.length = 0;
                for (var i = 0; i < 9; i++) {
                    if (data_[i] !== undefined) {
                        dpData.push(data_[i]);
                    }
                }

                res.render('index', { numItems: parseInt(_numitems), product: dpData, user: userName});
            } else {
                res.render('index', { numItems: parseInt(_numitems), product: {}, user: userName});
            }
        });
    });

    app.get('/home', authMiddleware.releaseAuth, function(req, res) {
        // query all data
        db.QueryAllProduct().then(data_ => {
            var _numitems = data_.length / 12;
            if (_numitems < 1) {
                _numitems = 1;
            }
            _numitems = _numitems + 1;
            var dpData = [];
            if (data_.length > 0) {
                dpData.length = 0;
                for (var i = 0; i < 9; i++) {
                    if (data_[i] !== undefined) {
                        dpData.push(data_[i]);
                    }
                }
                res.render('home', { numItems: parseInt(_numitems), product: dpData, user: "Login" });
            } else {
                res.render('home', { numItems: parseInt(_numitems), product: {}, user: "Login" });
            }
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
        // get all images from upload db
        db.queryImages().then(data => {
            logger.info(data.length);
            res.render('addproduct', { images: data });
        });
    });

    // app.post('/addproduct', authMiddleware.requireAuth, async function(req, res, next) {
    //     next();
    // }, async function(req, res, next) {

    //     const formData = req.body;
    //     let docs = null;
    //     try {
    //         await db.FindByProductId(req.body.productId).then(data => {
    //             docs = data;
    //         });
    //     } catch (err) {

    //     }
    //     if (docs == null) {
    //         await db.AddOneProduct(formData);
    //     }
    //     // get all images from upload db
    //     db.queryImages().then(data => {
    //         logger.info(data.length);
    //         res.render('addproduct', {images: data});
    //     });
    // });

    app.post('/addproduct', authMiddleware.requireAuth, async function(req, res, next) {
        const formData = req.body;
        let docs = null;
        try {
            await db.FindByProductId(req.body.productId).then(data => {
                docs = data;
            });
        } catch (err) {
            logger.error(err);
            return;
        }
        if (docs == null) {
            await db.AddOneProduct(formData);
        }
        // get all images from upload db
        db.queryImages().then(data => {
            logger.info(data.length);
            res.render('addproduct', { images: data });
        });
    });

    // app.get('/producttable', function(req, res) {
    //     db.QueryAllProduct().then(data_ => {
    //         res.render('producttable', { data: data_ });
    //     });
    // });

    // app.get('/editproduct/:id', function(req, res, next) {
    //     Product.findById(req.params.id)
    //         .then(data => res.render('editproduct', {
    //             product: data
    //         }))
    //         .catch(next);
    // });

    // app.put('/editproduct/:id', function(req, res, next) {
    //     Product.updateOne({ _id: req.params.id }, req.body)
    //         .then(() => res.redirect('/producttable'))
    //         .catch(next)
    // });

    // app.delete('/producttable/:id', function(req, res, next) {
    //     Product.deleteOne({ _id: req.params.id })
    //         .then(() => res.redirect('back'))
    //         .catch(next)
    // });

    // app.get('/productdetail/:id', function(req, res, next) {
    //     Product.findOne({ _id: req.params.id }, req.body)
    //         .then(data => res.render('productdetail', { product: data }))
    //         .catch(next);
    // });

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
        logger.info(req.body.quantity);
        res.render('buynow');
    });

    // sending email from customer
    app.get('/sendemail', function(req, res, next) {
        logger.info('app get sendemail');
        res.render('sendemail');
    });

    // summary
    app.get('/summary', function(req, res, next) {
        logger.info('app get summary');
        res.render('summary');
    });

    // campaign
    app.get('/campaign', function(req, res, next) {
        logger.info('app get campaign');
        res.render('campaign');
    });

    // not found
    app.get('/notfound404', function(req, res, next) {
        res.render('notfound404');
    });

    app.get('/carts', (req, res, next) => {
        res.send('FUNCTION IS DEVELOPING');
    });

    // app.get('/uploadbanner', function(req, res, next){
    //     res.render('uploadbanner');
    // });

    app.use('/', routerAuth);
    app.use('/', routerUser);
    app.use('/', routerProduct);
    app.use('/', routerUpload);
    app.use('/', routerUpdateDb);
    app.use('/', routerUpdateBanner);
    app.use('/', routerUploadNotify);
    app.use('/', routerNewArrival);
    app.use('/', routerNews);
    app.use('/', routerPagination);
}

module.exports = route;