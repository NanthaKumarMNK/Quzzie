const mongoose = require('mongoose');
const moment = require('moment');

const quizSchema = new mongoose.Schema({
    questionOrPoll: String,
    userId: String,
    quizName: String,
    impressions: String,
    timer: String,
    quiz: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: {
        getters: true   // Include getters when converting document to JSON
    }
});

// Custom getter for createdOn field
quizSchema.path('createdOn').get(function(value) {
    return moment(value).format('DD MMM, YYYY');
});

module.exports = mongoose.model('Quiz', quizSchema);
