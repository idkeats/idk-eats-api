const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');
const db = require('./models/index');
const app = express();
const secret = process.env.SECRET;
import routes from './routes/index';

db.init();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  const User = mongoose.model('User');

  let user = await User.findOne({email: email});

  if (!user) return done(null, false, {message: 'Wrong user bro'});

  bcrypt.compare(password, user.password, (err, result) => {
    if(err) return done(null, false, {message: 'Wrong password bro'});
    return done(null, user);
  });
  
}));

app.use((req, res, next) => {
  const protect = require('./modules/jwt').protect;
  if(req.path === '/api/v1/auth/login') next();
  else protect(req, res, next);
});
routes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
