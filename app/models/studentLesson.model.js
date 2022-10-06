const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StudentLesson = new Schema({

    studentID: {
        type: String,
        unique: true

    },
    lessonID: {
        type: String,
        unique: true

    }
});
module.exports = mongoose.model('studentLesson', StudentLesson);
