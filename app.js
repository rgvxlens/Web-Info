//Set up express
var express = require('express');
var bodyParser = require('body-parser');                                     
var app = express();
var path = require('path');

app.use(bodyParser.json());   
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup
require('./models/db.js');
// Routes setup
var routes = require('./routes/routes.js');
var indexRouter = require('./routes/index.js');
app.use('/', routes);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Add middleware libraries
app.use(express.static(path.join(__dirname, 'public')));

// For rendering page
// Home page
app.get('/',function(req, res, next) {
    //res.send("Hello World!");
    res.render('index', { title: 'Kitchen2Kitchen' });
});


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
