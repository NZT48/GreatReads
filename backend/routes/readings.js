var express = require('express');
var api = express.Router();
var ReadController = require('../controllers/readings');

// Interact with reading lists
api.get('/reading/:user', ReadController.getReadingBooks);
api.get('/to_read/:user', ReadController.getToReadBooks);
api.get('/finished/:user', ReadController.getFinishedBooks);
api.get('/readings/:user', ReadController.getReadings);
api.get('/reading_status/:book/:user', ReadController.getReadingStatus)
api.post('/add_reading', ReadController.addReadingBook);
api.post('/update_readings', ReadController.updateReadings);
api.get('/remove_readings/:book/:user', ReadController.removeReadings);


// Get pie chart data
api.get('/pie_chart/:user', ReadController.getPieChart);


module.exports = api;