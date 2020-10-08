const app = require('./app');
const port = 3800;

const models = require("./models");
const path = require('path');
const multer = require('multer');
const PATH = './uploads';

models.sequelize.sync().then(function () {
    console.log('Database looks fine');
}).catch(function (err) {
    console.log(err, 'Something went wrong with the Database update!');
})

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

module.exports = upload;

app.listen(port, () => {
    console.log('Server running on => http://localhost:' + port);
})