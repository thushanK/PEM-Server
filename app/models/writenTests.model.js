const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let WritenTest = new Schema({

    lessonID: {
        type: String,
        unique: true

    },
    testContent: {
        type: String,
        unique: true

    }
});
module.exports = mongoose.model('writenTest', WritenTest);
