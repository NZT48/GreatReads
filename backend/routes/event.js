var express = require('express');
var api = express.Router();
var EventController = require('../controllers/event');

// Get event or evnts
api.get('/events', EventController.getEvents);
api.get('/event/:name', EventController.getEventByName);

// Adding data about events to database
api.post('/add_event', EventController.addEvent);
api.post('/add_user_event', EventController.addUserInEvent);
api.post('/add_event_post', EventController.eventPost);

// For join requests in private events
api.get('/accept_event_user/:event/:user', EventController.acceptUser);
api.get('/reject_event_user/:event/:user', EventController.rejectUser);
api.get('/get_unaccepted_event_users/:event', EventController.getUnacceptedEventUsers);
api.get('/check_event_user/:event/:user', EventController.checkUser);

// Get posts or users for event
api.get('/get_event_posts/:event', EventController.getEventPosts);
api.get('/get_event_users/:event', EventController.getEventUsers);


// For strating and stoping event
api.get('/start_event/:event', EventController.startEvent);
api.get('/stop_event/:event', EventController.stopEvent);


module.exports = api;