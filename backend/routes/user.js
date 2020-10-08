var express = require('express');
var api = express.Router();
var UserController = require('../controllers/user');
const multer = require('multer');
const PATH = './uploads';

// User registration
api.post('/register', UserController.create);
api.post('/token_validate', UserController.tokenValidation);

// Basic authetication
api.post('/login', UserController.login);
api.get('/logout/:username', UserController.logout);

// Admin panel
api.get('/unapproved', UserController.getUnapproved);
api.post('/accept', UserController.accept);
api.post('/reject', UserController.reject);
api.post('/admin_register', UserController.adminCreate);
api.post('/change_role', UserController.changeRole);

// Forgot, reset and change password
api.post('/forgot', UserController.forgot);
api.post('/reset', UserController.reset);
api.post('/change_password', UserController.changePassword)

// Update user profile
api.post('/update_user', UserController.updateUser);

// Get user or users
api.get('/user/:username', UserController.getUser);
api.get('/users', UserController.getUsers);

// For users to follow each other
api.get('/follow/:follower/:followed', UserController.startFollow);
api.get('/unfollow/:follower/:followed', UserController.unFollow);
api.get('/do_follow/:follower/:followed', UserController.doFollow);
api.get('/get_followers/:username', UserController.getFollowers);
api.get('/get_followed/:username', UserController.getFollowed);

// Notifications
api.get('/notifications/:username', UserController.getNotifications);


// For upload & get files

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PATH);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage
})

api.get('/get_image/:name', UserController.get);
api.get('/get_pdf/:name', UserController.get);
api.post('/upload_image', upload.single('image'), UserController.upload);
api.post('/upload_cover', upload.single('image'), UserController.upload);
api.post('/upload_pdf', upload.single('pdf'), UserController.upload)

module.exports = api;
