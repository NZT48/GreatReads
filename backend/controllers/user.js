const waiting_users = require('../models').Waiting;
const users = require('../models').User;
const followings = require('../models').followings;
const notifications = require('../models').notifications;
const reseting_users = require('../models').resetpass;
const nodemailer = require('nodemailer');
const request = require('request');
var fs = require('fs');
var path = require('path');


async function create(req, res) {
    var existing = await users.findOne({ where: { username: req.body.username } });
    if (existing === null) {
        existing = await users.findOne({ where: { email: req.body.mail } });
        if (existing === null) {
            return waiting_users
                .create({
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.mail,
                    password: req.body.password,
                    role: req.body.role,
                    city: req.body.city,
                    country: req.body.country,
                    username: req.body.username,
                    image: req.body.image,
                    birthday: req.body.birthday
                })
                .then(user => res.status(201).send(user))
                .catch(error => res.status(400).send(error));
        } else {
            return res.status(201).send(JSON.stringify({ 'mail_used': true }));
        }
    } else {
        return res.status(201).send(JSON.stringify({ 'username_used': true }));
    }
}

async function login(req, res) {
    const dbuser = await users.findOne({ where: { username: req.body.username } });
    if (dbuser === null) {
        return res.status(201).send(JSON.stringify({ non_existing_user: true }));
    } else {
        if (dbuser.password == req.body.password) {
            await users.update({
                active: true
            }, { where: { username: req.body.username } });
            return res.status(201).send(JSON.stringify({ succesful_login: true, user: dbuser }));
        } else {
            return res.status(201).send(JSON.stringify({ wrong_password: true }));
        }
    }
}

async function logout(req, res) {
    await users.update({
        active: false,
        last_active: (new Date()).setHours((new Date).getHours() + 2)
    }, { where: { username: req.params.username } })
        .then(sc => res.status(201).send(JSON.stringify({ succesful_logout: true })))
        .catch(error => res.status(400).send(error));
}

async function getUsers(req, res) {
    const myusers = await users.findAll();
    return res.status(201).send(JSON.stringify(myusers));
}

async function getUser(req, res) {
    var username = req.params.username;
    const myUser = await users.findOne({ where: { username: username } });
    return res.status(201).send(JSON.stringify(myUser));
}

async function getUnapproved(req, res) {
    const unapproved = await waiting_users.findAll();
    return res.status(201).send(JSON.stringify(unapproved));
}

async function accept(req, res) {
    var existing = await waiting_users.findOne({ where: { username: req.body.username } });

    var destroying = await waiting_users.destroy({
        where: {
            username: existing.username
        }
    });

    return users
        .create({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            city: req.body.city,
            country: req.body.country,
            username: req.body.username,
            image: req.body.image,
            birthday: req.body.birthday
        })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
}

async function reject(req, res) {
    var destroying = await waiting_users.destroy({
        where: {
            username: req.body.username
        }
    });
    return res.status(201).send();

}

async function adminCreate(req, res) {
    var existing = await users.findOne({ where: { username: req.body.username } });
    if (existing === null) {
        existing = await users.findOne({ where: { email: req.body.mail } });
        if (existing === null) {
            return users
                .create({
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.mail,
                    password: req.body.password,
                    role: req.body.role,
                    city: req.body.city,
                    country: req.body.country,
                    username: req.body.username,
                    image: req.body.image,
                    birthday: req.body.birthday
                })
                .then(user => res.status(201).send(user))
                .catch(error => res.status(400).send(error));
        } else {
            return res.status(201).send(JSON.stringify({ 'mail_used': true }));
        }
    } else {
        return res.status(201).send(JSON.stringify({ 'username_used': true }));
    }
}

async function forgot(req, res) {
    var existing = await users.findOne({ where: { email: req.body.email } });
    if (existing === null) {
        return res.status(201).send(JSON.stringify({ unexisting_mail: true }));
    } else {
        var resetPassToken = Math.random().toString(36).substring(2, 25);

        //existing.email;
        var resetPasswordExpires = Date.now() + 3600000; //
        // sacuvati u bazu korisnika i resetPassToken i time

        reseting_users.create({
            email: existing.email,
            token: resetPassToken,
            expires: resetPasswordExpires
        });


        var smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'SomeMail',
                pass: 'SomePassword'
            }
        });

        var mailOptions = {
            to: existing.email,
            from: 'mejl.za.projekte@gmail.com',
            subject: 'GreatReads Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://localhost:4200/reset/' + resetPassToken + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };

        smtpTransport.sendMail(mailOptions, function (err) {
            return res.status(201).send(JSON.stringify({ success: true }));
        });

    }

}

async function reset(req, res) {
    var reseting = await reseting_users.findOne({ where: { token: req.body.token } });
    if (reseting === null) {
        return res.status(201).send(JSON.stringify({ unexisting_token: true }));
    } else {
        if (reseting.expires < Date.now()) {
            return res.status(201).send(JSON.stringify({ expired_token: true }));
        }

        var existing = await users.findOne({ where: { email: reseting.email } });
        existing.password = req.body.newpass;

        await users.update({
            password: req.body.newpass,
            active: true
        }, { where: { email: existing.email } });

        await reseting_users.destroy({
            where: {
                email: existing.email
            }
        });

        return res.status(201).send(JSON.stringify(existing));

    }
}

async function updateUser(req, res) {
    var existing = await users.findOne({ where: { username: req.body.username } });
    if (existing === null) {
        return res.status(201).send(JSON.stringify({ unexisting: true }));
    } else {
        await users.update({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.mail,
            role: req.body.role,
            city: req.body.city,
            country: req.body.country,
            birthday: req.body.birthday,
            image: req.body.image
        }, { where: { username: req.body.username } });
    }

    return res.status(201).send(JSON.stringify({ success: true }));

}

async function changeRole(req, res) {
    var existing = await users.findOne({ where: { username: req.body.username } });
    if (existing === null) {
        return res.status(201).send(JSON.stringify({ unexisting: true }));
    } else {
        await users.update({
            role: req.body.new_role
        }, { where: { username: req.body.username } });
    }

    return res.status(201).send(JSON.stringify({ success: true }));

}

async function changePassword(req, res) {
    var existing = await users.findOne({ where: { username: req.body.username } });
    if (existing.password != req.body.old_password) {
        return res.status(201).send(JSON.stringify({ wrong_password: true }));
    } else {
        await users.update({
            password: req.body.new_password
        }, { where: { username: req.body.username } });
    }

    return res.status(201).send(JSON.stringify({ success: true }));

}

async function tokenValidation(req, res) {

    let token = req.body.recaptcha;
    const secretKey = "secretKey";

    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}&remoteip=${req.connection.remoteAddress}`

    if (token === null || token === undefined) {
        res.status(201).send({ success: false, message: "Token is empty or invalid" })
        return console.log("token empty");
    }

    request(url, function (err, response, body) {
        //the body is the data that contains success message
        body = JSON.parse(body);

        //check if the validation failed
        if (body.success !== undefined && !body.success) {
            res.send({ success: false, 'message': "recaptcha failed" });
            return console.log("failed")
        }

    });

    //if passed response success message to client
    return res.status(201).send({ "success": true, 'message': "recaptcha passed" });

}


async function upload(req, res) {
    if (!req.file) {
        //console.log("No file is available!");
        return res.send({
            success: false
        });

    } else {
        //console.log('File is available!');
        return res.send({
            success: true
        })
    }

}


async function get(req, res) {
    var file_name = req.params.name;
    var path_file = './uploads/' + file_name;
    fs.exists(path_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            return res.status(200).send({ message: "Ups, the file not exists." });
        }
    });
}


async function startFollow(req, res) {
    var existing = await followings.findOne({ where: { follower: req.params.follower, followed: req.params.followed } });
    if (existing === null) {
        return followings
            .create({
                follower: req.params.follower,
                followed: req.params.followed
            })
            .then(foll => res.status(201).send(foll))
            .catch(error => res.status(400).send(error));
    } else {
        return res.status(201).send(JSON.stringify({ 'already_follow': true }));
    }
}

async function unFollow(req, res) {
    var existing = await followings.findOne({ where: { follower: req.params.follower, followed: req.params.followed } });
    if (existing) {
        await followings.destroy({
            where: {
                follower: req.params.follower, followed: req.params.followed
            }
        });
    } else {
        return res.status(201).send(JSON.stringify({ 'error': true }));

    }
}

async function doFollow(req, res) {
    const follow = await followings.findOne({ where: { follower: req.params.follower, followed: req.params.followed } });
    return res.status(201).send(JSON.stringify(follow));
}

async function getFollowers(req, res) {
    const followers = await followings.findAll({ where: { followed: req.params.username } });
    return res.status(201).send(JSON.stringify(followers));
}

async function getFollowed(req, res) {
    const followed = await followings.findAll({ where: { follower: req.params.username } });
    return res.status(201).send(JSON.stringify(followed));
}

async function getNotifications(req, res) {
    const notfs = await notifications.findAll({ where: { reciever: req.params.username } });
    return res.status(201).send(JSON.stringify(notfs));
}

module.exports = {
    changePassword,
    getUser,
    getUsers,
    reset,
    forgot,
    getUnapproved,
    updateUser,
    accept,
    reject,
    create,
    adminCreate,
    login,
    logout,
    tokenValidation,
    changeRole,
    get,
    upload,
    startFollow,
    unFollow,
    doFollow,
    getFollowers,
    getFollowed,
    getNotifications
};
