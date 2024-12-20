var createError = require('http-errors');
require(`dotenv`).config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require(`express-session`)
var flash = require(`express-flash`)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var supplierRouter = require(`./routes/supplier`)
var adminRouter = require('./routes/admin');
var cashierRouter = require(`./routes/cashier`)

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'rahasia',
    resave: false,
    saveUninitialized: true,
    cookie: {
       httpOnly:true,
       secure: false, 
       maxAge: 6000000000,
      }
}))

app.use(flash())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/supplier', supplierRouter);
app.use('/admin', adminRouter);
app.use('/cashier', cashierRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
