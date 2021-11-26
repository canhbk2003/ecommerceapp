const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const querystring = require('querystring');

const methodOverride = require('method-override');

const url = require('url');
const http = require('http');

const db = require('./db.js');
const util = require('./utils/util.js');

const Product = require('./models/product');
const User = require('./models/user');

const { application } = require('express');
const { type } = require('os');

const app = express();

const viewPath = path.join(__dirname, 'views');
app.use(express.static(viewPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

const asset = path.join(__dirname, 'public');
console.log(asset);
app.use(express.static(asset));

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', viewPath);
// use res.render to load up an ejs view file

// fetch data


// home page
app.get('/', function(req, res) {
    // query all data
    db.QueryAllProduct().then(data_ => {
        var numitems = data_.length / 12;
        if (numitems < 1) {
            numitems = 1;
        }
        res.render('index', { numItems: parseInt(numitems), product: data_ });
    });
});

app.get('/login', function(req, res) {
    res.render('login');
});

app.post('/login', function(req, res, next) {
    var user = req.body.user;
    var password = req.body.password;
    // find user and password if mapping -> redirect
    if (user) {
        res.redirect('/admin?userName=' + user);
    } else {
        res.redirect(404, 'login');
    }
});

app.get('/contact', function(req, res) {
    res.render('contact');
});

app.get('/edituser', function(req, res) {
    res.render('edituser');
});

app.get('/admin', function(req, res, next) {

    db.QueryAllUser().then(data => res.render('admin', {
        data: data
    }));
});

app.get('/reset', function(req, res) {
    res.render('reset');
});

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

app.get('/changepassword', function(req, res) {
    res.render('changepassword');
});

app.post('/changepassword', async function(req, res) {
    // get user with password

});

app.get('/signup', function(req, res) {
    res.render('signup');
});

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

app.get('/addproduct', function(req, res) {
    res.render('addproduct');
});

app.post('/addproduct', async function(req, res, next) {
    console.log(req.body);
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
    console.log(docs);
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

app.get('/edituser/:id', function(req, res, next) {
    User.findById(req.params.id)
        .then(data => res.render('edituser', {
            user: data
        }))
        .catch(next)
});

app.get('/adduser', function(req, res, nex) {
    res.render('adduser');
});

app.post('/adduser', function(req, res, next) {
    try {
        db.AddOneUser(req.body);
    } catch (err) {
        console.log(err);
    }

    res.render('adduser');
});

app.put('/edituser/:id', function(req, res, next) {
    User.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.redirect('/admin'))
        .catch(next)
});

app.delete('/admin/:id', function(req, res, next) {
    User.deleteOne({ _id: req.params.id })
        .then(() => res.render('back'))
        .catch(next)
});


// app information
app.listen(3000);
console.log('Server is listening on port 3000');