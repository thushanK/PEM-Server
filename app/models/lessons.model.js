const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Lesson = new Schema({

    lessonID: {
        type: String,
        unique: true

    },
    lessonName: {
        type: String,
        unique: true

    },
    lessonContent: {
        type: String,

    },
    lessonVideoLink: {
        type: String,

    },
    studentLevel: {
        type: String,

    }
});
module.exports = mongoose.model('lesson', Lesson);
