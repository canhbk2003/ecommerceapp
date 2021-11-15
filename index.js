const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const querystring = require('querystring');

const url = require('url');
const http = require('http');

const db = require('./db.js');
const util = require('./utils/util.js');
const { application } = require('express');
const { type } = require('os');

const app = express();

const viewPath = path.join(__dirname, 'views');
app.use(express.static(viewPath));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const asset = path.join(__dirname, 'public');
console.log(asset);
app.use(express.static(asset));

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', viewPath);
// use res.render to load up an ejs view file

// fetch data


// index page
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/login', function(req, res) {
    res.render('login');
});

app.post('/login', function(req, res, next) {
    var user = req.body.user;
    var password = req.body.password;
    // find user and password if mapping -> redirect
    if(user){
        res.redirect('/admin?userName=' + user);
    }
    else{
        res.redirect(404, 'login');
    }
});

app.get('/contact', function(req, res){
    res.render('contact');
});

app.get('/edituser', function(req, res){
    res.render('edituser');
});

app.get('/admin', function(req, res) {
    
    db.connectAndQueryAll().then(data => {
        res.render('admin', { userName: req.query.userName, userRole: req.query.userRole, data: data});
    });
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
    if(isChecked == false){
        next();
    }

    res.send(isChecked);

    next();
}, function(req, res, next){
    res.redirect('/');
});

app.post('/updateuser', function(req, res){
    res.send('update user called!');
});

app.listen(3000);
console.log('Server is listening on port 3000');