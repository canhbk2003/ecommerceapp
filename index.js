const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const PORT = 3000;

const session = require('express-session');

const app = express();
const route = require('./routes/route.index');

const viewPath = path.join(__dirname, 'views');
const viewPathEx = path.join(__dirname, 'views/guide-policy/');
app.use(express.static(viewPath));
app.use(express.static(viewPathEx));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // to support JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

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

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', [viewPath, viewPathEx]);
// use res.render to load up an ejs view file
route(app);
// app information
app.listen(`${PORT}`);