var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler (will print stacktrace)
if (app.get('env') === 'develoment') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}
// production error handler (no stacktrace leaked to user)
app.use(function(err, req, res, next) {
  res.sendStatus(err.status || 500);
});

module.exports = app;
