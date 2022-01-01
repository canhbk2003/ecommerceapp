const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const PORT = 3000;

const session = require('express-session');

const app = express();
const route = require('./routes/route.index');

const viewPath = path.join(__dirname, 'views');
app.use(express.static(viewPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 180*60*1000}
}));

const asset = path.join(__dirname, 'public');
app.use(express.static(asset));

const upload = path.join(__dirname, 'upload');
app.use(express.static(upload));
const logger = require('./log/logger');

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', viewPath);
// use res.render to load up an ejs view file
route(app);
// app information
app.listen(`${PORT}`);
logger.info('=======================APP START========================');
logger.info(`Server is listening on port: ${PORT}`);