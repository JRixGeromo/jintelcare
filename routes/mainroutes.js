var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var User = require('../models/user');
var Message = require('../models/message');
var Calendar = require('../models/calendar');

router.get('/list-schedules', function (req, res, next) {
    Calendar.find()
        .populate('user', 'firstName')
        .exec(function (err, calendars) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: calendars
            });
        });
});



router.get('/list-messages', function (req, res, next) {
    Message.find()
        .populate('user', 'firstName')
        .exec(function (err, messages) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: messages
            });
        });
});


router.post('/daily-schedules', function (req, res, next) {
  

});


router.use('/', function (req, res, next) {

    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});


router.post('/add-message', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var message = new Message({
            content: req.body.content,
            user: user._id
        });

        message.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.messages.push(result);
            user.save();
            res.status(201).json({
                Code: 'Message Routes',
                message: 'Saved message',
                obj: result
            });
        });
    });
});

router.post('/create-schedule', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);

    User.findById(decoded.user._id, function (err, user) {

        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var calendar = new Calendar({
            description: req.body.description,
            user: user._id
        });

        calendar.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.calendars.push(result);
            user.save();
            res.status(201).json({
                Code: 'Calendar Routes',
                message: 'Saved Schedule',
                obj: result
            });
        });
    });
});


router.patch('/update-message/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Message Found!',
                error: {message: 'Message not found'}
            });
        }
        if (message.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        message.content = req.body.content;
        message.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated message',
                obj: result
            });
        });
    });
});

router.delete('/delete-message/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Message Found!',
                error: {message: 'Message not found'}
            });
        }
        if (message.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        message.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted message',
                obj: result
            });
        });
    });
});


/* Calendar Scripts */




router.patch('/update-schedule/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Calendar.findById(req.params.id, function (err, calendar) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!calendar) {
            return res.status(500).json({
                title: 'No Schedule Found!',
                error: {message: 'Schedule not found'}
            });
        }
        if (calendar.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        calendar.description = req.body.description;
        calendar.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated message',
                obj: result
            });
        });
    });
});

router.delete('/delete-schedule/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Calendar.findById(req.params.id, function (err, calendar) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!calendar) {
            return res.status(500).json({
                title: 'No Schedule Found!',
                error: {message: 'Schedule not found'}
            });
        }
        if (calendar.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        calendar.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted calendar',
                obj: result
            });
        });
    });
});

module.exports = router;
