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

const cookieParser = require('cookie-parser');

const authMiddleware = require('./middlewares/auth.middleware');

const { application } = require('express');
const { type } = require('os');

const PORT = 3000;

const app = express();

const viewPath = path.join(__dirname, 'views');
app.use(express.static(viewPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

app.use(cookieParser());

const asset = path.join(__dirname, 'public');
app.use(express.static(asset));

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', viewPath);
// use res.render to load up an ejs view file

// fetch data


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

app.get('/login', function(req, res) {
    res.render('login', { loginstate: "" });
});


app.post('/login', function(req, res, next) {
    var userName = req.body.user;
    var password = req.body.password;
    // find user and password if mapping -> redirect

    if (userName === "" || password === "") {
        res.render('login', { loginstate: "Tên người dùng hoặc mật khẩu không đúng!" });
        return;
    }


    db.QueryOneUser(userName).then(data => {
        if (!data) {
            res.render('login', { loginstate: "Không tồn tại user này!" });
            return;
        }
        // valid password
        const user = new User(data);
        if (!user.validPassword(password)) {
            res.render('login', { loginstate: "Mật khẩu không đúng!" });
            return;
        }

        console.log(user.userId);

        res.cookie('userId', user.userId);
        res.redirect('/admin?userName=' + user);
    });
});

app.get('/contact', function(req, res) {
    res.render('contact');
});

app.get('/edituser', function(req, res) {
    res.render('edituser');
});

app.get('/admin', authMiddleware.requireAuth, function(req, res, next) {

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

// app information
app.listen(PORT);
console.log('Server is listening on port: ' + PORT);