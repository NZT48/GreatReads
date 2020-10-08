const books = require('../models').book;
const genres = require('../models').genres;
const comments = require('../models').comments;
const followings = require('../models').followings;
const notifications = require('../models').notifications;




async function getBookByName(req, res) {
    var name = req.params.name;
    const myBook = await books.findOne({ where: { name: name } });
    return res.status(201).send(JSON.stringify(myBook));
}


async function getBooks(req, res) {
    const booksToReturn = await books.findAll({
        hierarchy: true,
        attributes: ['name', 'published', 'authors', 'image', 'rating', 'genres', 'description', 'approved']
    });
    return res.status(201).send(JSON.stringify(booksToReturn));
}


async function addBook(req, res) {
    var existing = await books.findOne({ where: { name: req.body.name } });
    if (existing === null) {
        return books
            .create({
                name: req.body.name,
                authors: req.body.authors,
                published: req.body.published,
                genres: req.body.genres,
                description: req.body.description,
                rating: req.body.rating,
                image: req.body.image,
                approved: req.body.approved
            })
            .then(book => res.status(201).send(book))
            .catch(error => res.status(400).send(error));
    } else {
        return res.status(201).send(JSON.stringify({ 'exists': true }));
    }
}

async function updateBook(req, res) {
    var existing = await books.findOne({ where: { name: req.body.name } });
    if (existing != null) {
        await books.update({
            name: req.body.name,
            authors: req.body.authors,
            published: req.body.published,
            image: req.body.image,
            description: req.body.description
        }, { where: { name: req.body.name } }).catch(error => res.status(400).send(error));

        return res.status(201).send(JSON.stringify({ success: true }));

    } else {
        return res.status(201).send(JSON.stringify({ 'not_exist': true }));
    }
}

async function updateBookPDF(req, res) {
    var existing = await books.findOne({ where: { name: req.body.name } });
    if (existing != null) {
        await books.update({
            pdf: req.body.pdf
        }, { where: { name: req.body.name } }).catch(error => res.status(400).send(error));

        return res.status(201).send(JSON.stringify({ success: true }));

    } else {
        return res.status(201).send(JSON.stringify({ 'not_exist': true }));
    }
}

async function getGenres(req, res) {
    const genresToReturn = await genres.findAll({
        hierarchy: true,
        attributes: ['name', 'count']
    });
    return res.status(201).send(JSON.stringify(genresToReturn));
}

async function addGenre(req, res) {
    var existing = await genres.findOne({ where: { name: req.params.name } });
    if (existing === null) {
        return genres
            .create({
                name: req.params.name,
                count: 0,
            })
            .then(genre => res.status(201).send({ 'success': true }))
            .catch(error => res.status(400).send(error));
    } else {
        return res.status(201).send(JSON.stringify({ 'exist': true }));
    }

}


async function removeGenre(req, res) {
    var existing = await genres.findOne({ where: { name: req.params.name } });
    if (existing != null) {

        let notZero = false;

        const bks = await books.findAll();

        for (var key in bks) {
            if (bks.hasOwnProperty(key)) {
                if (bks[key].genres.toLowerCase().includes(req.params.name.toLowerCase())) {
                    notZero = true;
                    break;
                }

            }
        }

        if (notZero) {
            return res.status(201).send(JSON.stringify({ 'count_not_zero': true }));
        }

        await genres.destroy({
            where: {
                name: req.params.name
            }
        }).then(genre => res.status(201).send({ 'success': true }))
            .catch(error => res.status(400).send(error));
    } else {
        return res.status(201).send(JSON.stringify({ 'notexist': true }));
    }
}


async function getCommentsForAuthor(req, res) {
    var author = req.params.author;
    const myComment = await comments.findAll({ where: { author: author } });
    return res.status(201).send(JSON.stringify(myComment));
}


async function getCommentsForBook(req, res) {
    var book = req.params.book;
    const myComment = await comments.findAll({ where: { book: book } });
    return res.status(201).send(JSON.stringify(myComment));
}


async function addComment(req, res) {
    var existing = await comments.findOne({ where: { author: req.body.author, book: req.body.book } });
    if (existing === null) {
        return comments
            .create({
                book: req.body.book,
                bookAuthors: req.body.bookAuthors,
                author: req.body.author,
                description: req.body.description,
                rating: req.body.rating
            })
            .then(comment => {
                updateRating(req.body.book);
                sendNotifications(req.body.author, req.body.book);
                res.status(201).send(comment)
            })
            .catch(error => res.status(400).send(error));
    } else {
        return await comments.update(
            {
                description: req.body.description,
                rating: req.body.rating
            },
            { where: { book: req.body.book, author: req.body.author } })
            .then(comment => {
                updateRating(req.body.book);
                sendNotifications(req.body.author, req.body.book);
                res.status(201).send(comment)
            })
            .catch(error => res.status(400).send(error));
    }
}

async function sendNotifications(sender, book) {

    const followers = await followings.findAll({
        where: { followed: sender }
    });

    for (let f of followers) {
        await notifications.create({
            sender: sender,
            reciever: f.follower,
            book: book
        });
    }
}

async function updateRating(book) {
    const comms = await comments.findAll({
        where: { book: book }
    });
    let cnt = 0;
    let newRating = 0;
    for (let c of comms) {
        newRating += c.rating;
        cnt++;
    }
    newRating = newRating / cnt;

    await books.update(
        { rating: newRating },
        { where: { name: book } });
}

async function unapprovedBooks(req, res) {
    const myBooks = await books.findAll({ where: { approved: false } });
    return res.status(201).send(JSON.stringify(myBooks));
}

async function acceptBook(req, res) {
    await books.update(
        { approved: true },
        { where: { name: req.params.name } });
    return res.status(201).send(JSON.stringify({ success: true }));
}

async function rejectBook(req, res) {
    await books.destroy({
        where: {
            name: req.params.name
        }
    }).then(book => res.status(201).send({ 'success': true }))
        .catch(error => res.status(400).send(error));
}



module.exports = {
    getBookByName,
    getBooks,
    addBook,
    updateBook,
    updateBookPDF,
    getGenres,
    addGenre,
    removeGenre,
    getCommentsForBook,
    getCommentsForAuthor,
    addComment,
    unapprovedBooks,
    acceptBook,
    rejectBook
};

