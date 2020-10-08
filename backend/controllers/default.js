const version = '1.0.0';

function help(req, res) {
    res.status(200).send({
        message: 'Welcome Back! API Version: ' + version + ' ;-)'
    });
}

function status(req, res) {
    res.status(200).send({
        message: {
            'api': 'GreatReads',
            'status': 'OK',
            'version': version,
        }
    });
}

module.exports = {
    help,
    status
};
