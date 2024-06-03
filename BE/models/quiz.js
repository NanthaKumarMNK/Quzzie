const mongoose = require("mongoose");
const moment = require("moment");

const quizSchema = new mongoose.Schema(
  {
    questionOrPoll: {
      type: String,
      required: true,
    },

    userId: String,
    quizName: {
      type: String,
      required: true,
    },

    impressions: {
      type: String,
      required: true,
    },

    timer: {
      type: String,
      required: true,
    },

    quiz: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);
quizSchema.path("createdOn").get(function (value) {
  return moment(value).format("DD MMM, YYYY");
});

module.exports = mongoose.model("Quiz", quizSchema);
