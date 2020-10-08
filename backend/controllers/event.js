const events = require('../models').events;
const posts = require('../models').eventPost;
const users = require('../models').userInEvent;

async function getEventByName(req, res) {
    var name = req.params.name;
    const myEvent = await events.findOne({ where: { name: name } });
    return res.status(201).send(JSON.stringify(myEvent));
}

async function getEvents(req, res) {
    const eventsToReturn = await events.findAll({
        hierarchy: true
    });
    return res.status(201).send(JSON.stringify(eventsToReturn));
}

async function addEvent(req, res) {
    var existing = await events.findOne({ where: { name: req.body.name } });
    if (existing === null) {
        return events
            .create({
                name: req.body.name,
                author: req.body.author,
                private: req.body.isPrivate,
                start: req.body.start,
                end: req.body.end,
                description: req.body.description,
            })
            .then(event => res.status(201).send(event))
            .catch(error => res.status(400).send(error));
    } else {
        return res.status(201).send(JSON.stringify({ 'exists': true }));
    }
}

async function addUserInEvent(req, res) {
    var existing = await users.findOne({ where: { event: req.body.event, user: req.body.user } });
    if (existing === null) {
        return users
            .create({
                event: req.body.event,
                user: req.body.user,
                accepted: req.body.accepted
            })
            .then(event => res.status(201).send(event))
            .catch(error => res.status(400).send(error));
    } else {
        return res.status(201).send(JSON.stringify({ 'exists': true }));
    }
}

async function eventPost(req, res) {
    return posts
        .create({
            event: req.body.event,
            author: req.body.author,
            description: req.body.description
        })
        .then(event => res.status(201).send(event))
        .catch(error => res.status(400).send(error));
}

async function getEventPosts(req, res) {
    var event = req.params.event;
    const myPosts = await posts.findAll({ where: { event: event } });
    return res.status(201).send(JSON.stringify(myPosts));
}


async function acceptUser(req, res) {
    await users.update(
        { accepted: true },
        { where: { user: req.params.user, event: req.params.event } });
    return res.status(201).send(JSON.stringify({ success: true }));
}

async function rejectUser(req, res) {
    await users.destroy({
        where: {
            user: req.params.user, event: req.params.event
        }
    }).then(book => res.status(201).send({ 'success': true }))
        .catch(error => res.status(400).send(error));
}

async function checkUser(req, res) {
    const myUsers = await users.findOne({ where: { user: req.params.user, event: req.params.event } });
    if (myUsers === null)
        return res.status(201).send(JSON.stringify({ joined: false }));
    else {
        if (myUsers.accepted)
            return res.status(201).send(JSON.stringify({ joined: true }));
        else
            return res.status(201).send(JSON.stringify({ joined: false }));
    }
}

async function getUnacceptedEventUsers(req, res) {
    const myUsers = await users.findAll({ where: { event: req.params.event, accepted: false } });
    return res.status(201).send(JSON.stringify(myUsers));
}

async function getEventUsers(req, res) {
    const myUsers = await users.findAll({ where: { event: req.params.event } });
    return res.status(201).send(JSON.stringify(myUsers));
}

async function startEvent(req, res) {
    await events.update(
        { active: true },
        { where: { name: req.params.event } });
    return res.status(201).send(JSON.stringify({ success: true }));
}

async function stopEvent(req, res) {
    await events.update(
        { active: false },
        { where: { name: req.params.event } });
    return res.status(201).send(JSON.stringify({ success: true }));
}

module.exports = {
    getEventByName,
    getEvents,
    addEvent,
    addUserInEvent,
    acceptUser,
    rejectUser,
    eventPost,
    getEventPosts,
    getEventUsers,
    getUnacceptedEventUsers,
    checkUser,
    startEvent,
    stopEvent
};