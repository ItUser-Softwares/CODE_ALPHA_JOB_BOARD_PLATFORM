var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var profileRouter = require('./routes/profile');
var jobsRouter = require('./routes/jobs');
const session = require('express-session');

const { sequelize } = require('./models');


var app = express();

// Database init
sequelize.sync().then(() => {
  console.log('Database synced successfully');
}).catch((err) => {
  console.error('Error syncing database: ', err);
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Use true if HTTPS is enabled
  })
);

app.use('/uploads', express.static('uploads'));

app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/jobs', jobsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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
