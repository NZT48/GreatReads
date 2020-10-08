var express = require('express');
var api = express.Router();
var DefaultController = require('../controllers/default');

// Just for testing api
api.get('/', DefaultController.help);
api.get('/status', DefaultController.status);

module.exports = api;
