var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    description: {type: String, required: true},
    sergroId: {type: String},
    schedType: {type: String},
    description: {type: String},
    notes: {type: String},
    origin: {type: String},
    seriesLink: {type: String},
    deleted: {type: String},
    minAttendees: {type: String},
    maxAttendees: {type: String},
  
    // clientRem: {
    //  txt1: String,
    //  txt2: String,
    //  txt3: String,
    //  email1: String,
    //  email2: String,
    //  email3: String
    // },
  
    // provRem: {
    //  txt1: String,
    //  txt2: String,
    //  txt3: String,
    //  email1: String,
    //  email2: String,
    //  email2: String
    // },
  
    // clientRemSent: {
    //  txt1: String,
    //  txt2: String,
    //  txt3: String,
    //  email1: String,
    //  email2: String,
    //  email3: String
    // },
  
    // provRemSent: {
    //  txt1: String,
    //  txt2: String,
    //  txt3: String,
    //  email1: String,
    //  email2: String,
    //  email2: String
    // },
  
    // timeInfo: {
    //  startDT: String,
    //  endDT: String,
    //  startTime: String,
    //  endTime: String,
    //  totMins: String,
    //  totHrs: String,
    //  prepTime: String,
    //  finishTime: String
    // },
  
    seriesSuccession: {type: String},
    stepsCompleted: {type: String},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

schema.post('remove', function (calendar) {
    User.findById(calendar.user, function (err, user) {
        user.calendar.pull(calendar._id);
        user.save();
    });
});

module.exports = mongoose.model('Calendar', schema);
