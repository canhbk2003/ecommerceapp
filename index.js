const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const PORT = 3000;

const app = express();
const route = require('./routes/route.index');

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

route(app);
// app information
app.listen(PORT);
console.log('Server is listening on port: ' + PORT);