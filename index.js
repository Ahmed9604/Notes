require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require ('./server/config/db.js');

const session = require ('express-session');
const passport = require('passport');
const mongoStore = require('connect-mongo');

const expressLayouts = require ('express-ejs-layouts');
const methodOverride = require('method-override');

const port = 5000 || process.env.PORT

app.use(session({
    secret: 'secretBadVeryBad',
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: process.env.MONGODB_URL
    }),
    // cookie : {maxAge : new Date (Date.now() + (3600000000))}
    //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
  // Date.now() - 30 * 24 * 60 * 60 * 1000
}));

// initialize passport

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(methodOverride("_method"));

// databese connection 

connectDB();

// static files

app.use(express.static('public'));

// template engine

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout','./layouts/main');

// routes

app.use('/',require('./server/routes/auth.js'))
app.use('/',require('./server/routes/app.js'))
app.use('/',require('./server/routes/dashboard.js'))


// error handle

app.use("*",(req,res)=>{
    res.status(404).render('Error');
}
)

app.listen(port, ()=>
   console.log(`listening on ${port}`));
