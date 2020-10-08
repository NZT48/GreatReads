const books = require('../models').book;
const genres = require('../models').genres;
const readings = require('../models').readings;


async function getReadings(req, res) {
    const rds = await readings.findAll({
        where: { readername: req.params.user }
    });
    return res.status(201).send(JSON.stringify(rds));
}

async function getFinishedBooks(req, res) {
    const rds = await readings.findAll({
        where: { readername: req.params.user, finished: true }
    });
    return res.status(201).send(JSON.stringify(rds));
}

async function getToReadBooks(req, res) {
    const rds = await readings.findAll({
        where: { readername: req.params.user, toread: true }
    });
    return res.status(201).send(JSON.stringify(rds));
}

async function getReadingBooks(req, res) {
    const rds = await readings.findAll({
        where: { readername: req.params.user, finished: false, toread: false }
    });
    return res.status(201).send(JSON.stringify(rds));
}

async function getReadingStatus(req, res) {
    const rds = await readings.findOne({
        where: { readername: req.params.user, bookname: req.params.book }
    });
    return res.status(201).send(JSON.stringify(rds));
}

async function removeReadings(req, res) {
    await readings.destroy({
        where: {
            readername: req.params.user, bookname: req.params.book
        }
    }).then(rds => res.status(201).send({ 'success': true }))
        .catch(error => res.status(400).send(error));
}



async function updateReadings(req, res) {
    var existing = await readings.findOne({ where: { readername: req.body.readername, bookname: req.body.bookname } });
    if (existing === null) {
        return readings
            .create({
                bookname: req.body.bookname,
                readername: req.body.readername,
                toread: req.body.toread,
                finished: req.body.finished,
                current: req.body.current,
                pages: req.body.pages
            })
            .then(rd => res.status(201).send(rd))
            .catch(error => res.status(400).send(error));
    } else {
        return await readings.update(
            {
                toread: req.body.toread,
                finished: req.body.finished,
                current: req.body.current,
                pages: req.body.pages
            },
            { where: { bookname: req.body.bookname, readername: req.body.readername } });
    }
}

async function addReadingBook(req, res) {
    var existing = await readings.findOne({ where: { readername: req.body.readername, bookname: req.body.bookname } });
    if (existing === null) {
        return readings
            .create({
                bookname: req.body.bookname,
                readername: req.body.readername,
                toread: req.body.toread,
                finished: req.body.finished,
                current: req.body.current,
                pages: req.body.pages
            })
            .then(rd => res.status(201).send(rd))
            .catch(error => res.status(400).send(error));
    } else {
        return res.status(200).send(JSON.parse({ existing: true }));

    }
}


async function getPieChart(req, res) {
    var genresChart = await genres.findAll({
        attributes: ['name']
    });

    var pieChartLabels = [];
    var pieChartData = [];

    for (var key in genresChart) {
        if (genresChart.hasOwnProperty(key)) {
            pieChartLabels.push(genresChart[key].name);
        }
    }

    const readBooks = await readings.findAll({
        where: { readername: req.params.user, finished: true },
        hierarchy: true,
        attributes: ['bookname']
    });

    var bookToCheck = [];

    for (var key in readBooks) {
        if (readBooks.hasOwnProperty(key)) {
            bookToCheck.push(readBooks[key].bookname);
        }
    }

    genresCnt = [];
    strGenres = ' ';
    var bks;
    for (let book of bookToCheck) {
        bks = await books.findOne({
            where: { name: book }
        });

        for (var key in bks) {
            if (bks.hasOwnProperty(key)) {
                strGenres += ' ' + bks[key].genres;
                break;
            }
        }
    }

    for (genr of pieChartLabels) {
        pieChartData.push(strGenres.split(genr).length - 1);
    }

    return res.status(201).send(JSON.stringify({ data: pieChartData, labels: pieChartLabels }));
}





module.exports = {
    getReadingBooks,
    getToReadBooks,
    getFinishedBooks,
    getReadings,
    addReadingBook,
    updateReadings,
    getReadingStatus,
    removeReadings,
    getPieChart
};