//Set up express
var express = require('express');
var bodyParser = require('body-parser');                                     
var app = express();
var path = require('path');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());   
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup
require('./models/db.js');

// Routes setup
var routes = require('./routes/routes.js');
var indexRouter = require('./routes/index.js');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
});

module.exports = app;
