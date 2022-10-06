const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MCQTest = new Schema({
    lessonID: {
        type: String,
    },
    question: {
        type: String,
        unique: true
    },
    awn1: {
        type: String,
    },
    awn2: {
        type: String,
    },
    awn3: {
        type: String,
    },
    awn4: {
        type: String,
    },
    correct: {
        type: String,
    }
});
module.exports = mongoose.model('mcqTest', MCQTest);



