var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var default_routes = require('./routes/default');
var user_routes = require('./routes/user');
var book_routes = require('./routes/book');
var event_routes = require('./routes/event');
var readings_routes = require('./routes/readings');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

app.use('/api', user_routes);
app.use('/api', book_routes);
app.use('/api', event_routes);
app.use('/api', readings_routes);
app.use('/', default_routes);

module.exports = app;