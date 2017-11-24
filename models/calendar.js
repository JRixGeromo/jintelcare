var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    description: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

schema.post('remove', function (calendar) {
    User.findById(calendar.user, function (err, user) {
        user.calendars.pull(calendar._id);
        user.save();
    });
});

module.exports = mongoose.model('Calendar', schema);
