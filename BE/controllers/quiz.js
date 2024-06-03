const quiz = require("../models/quiz");
const Quiz = require("../models/quiz");

const postCreateQuiz = async (req, res, next) => {
  try {
    const questionNumber = req.body;

    const userId = req.userId;

    const areAllValuesTruthy = (obj) => {
      if (typeof obj !== "object" || obj === null) {
        return Boolean(obj);
      }

      return Object.entries(obj).every(([key, value]) => {
        return areAllValuesTruthy(value);
      });
    };
    const present = areAllValuesTruthy(questionNumber);
    if (!present) {
      return res.json({ message: "Invalid quizNumber" });
    }

    const quiz = Object.keys(questionNumber.quiz);
    if (quiz.length < 1 || quiz.length > 5) {
      return res.json({ message: "Invalid number of questions" });
    }

    Object.keys(questionNumber.quiz).forEach((questionKey) => {
      const optionData = questionNumber.quiz[questionKey].option;
      const optionKeys = Object.keys(optionData);

      if (optionKeys.length < 2 || optionKeys.length > 4) {
        return res.json({ message: "Invalid number of options" });
      }

      optionKeys.forEach((optionKey) => {
        const option = optionData[optionKey];
        if (!option.hasOwnProperty("text") && !option.hasOwnProperty("image")) {
          return res.json({ message: "Invalid option type" });
        }
      });
    });

    const quizData = new Quiz({
      questionOrPoll: questionNumber.questionOrPoll,
      userId: userId,
      impressions: "0",
      quizName: questionNumber.quizName,
      timer: questionNumber.timer,
      quiz: questionNumber.quiz,
    });
    console.log(quizData);

    await quizData.save();

    res.json({ message: "Quiz Created Successfully" });
  } catch (error) {
    console.error("Error saving document:", error);
    next(error);
  }
};

const putEditQuiz = async (req, res, next) => {
  try {
    let quizId = req.params.quizId.replace(":", "");
    const questionNumber = req.body;

    const areAllValuesTruthy = (obj) => {
      if (typeof obj !== "object" || obj === null) {
        return Boolean(obj);
      }

      return Object.entries(obj).every(([key, value]) => {
        return areAllValuesTruthy(value);
      });
    };
    const present = areAllValuesTruthy(questionNumber);
    if (!present) {
      return res.json({ message: "Invalid quizNumber" });
    }

    const quiz = Object.keys(questionNumber.quiz);
    if (quiz.length < 1 || quiz.length > 5) {
      return res.json({ message: "Invalid number of questions" });
    }

    Object.keys(questionNumber.quiz).forEach((questionKey) => {
      const optionData = questionNumber.quiz[questionKey].option;
      const optionKeys = Object.keys(optionData);

      if (optionKeys.length < 2 || optionKeys.length > 4) {
        return res.json({ message: "Invalid number of options" });
      }

      optionKeys.forEach((optionKey) => {
        const option = optionData[optionKey];
        if (!option.hasOwnProperty("text") && !option.hasOwnProperty("image")) {
          return res.json({ message: "Invalid option type" });
        }
      });
    });

    const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, questionNumber, {
      new: true,
    });

    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json({ message: "Quiz updated successfully" });
  } catch (error) {
    console.error("Error updating quiz:", error);
    next(error);
  }
};

const putImpression = async (req, res, next) => {
  try {
    let quizId = req.params.quizId;
    quizId = quizId.replace(":", "");

    const quizNumber = req.body;

    const quizDetails = await Quiz.findById(quizId);
    if (!quizDetails) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    quizDetails.impressions = String(
      parseInt(quizDetails.impressions || 0) + 1
    );

    let count = 0;
    let isQuestionAndAnswer = true;

    Object.entries(quizNumber).forEach(([questionKey, selectedOption]) => {
      if (quizDetails.quiz[questionKey]) {
        if (!quizDetails.quiz[questionKey].answer) {
          isQuestionAndAnswer = false;
        } else {
          if (quizDetails.quiz[questionKey].answer === selectedOption) {
            count++;
          }
        }

        if (
          quizDetails.quiz[questionKey].selectedOptions[selectedOption] !==
          undefined
        ) {
          quizDetails.quiz[questionKey].selectedOptions[selectedOption] =
            String(
              parseInt(
                quizDetails.quiz[questionKey].selectedOptions[selectedOption]
              ) + 1
            );
        } else {
          return res.json({
            message: "Selected option does not exist for question",
          });
        }
      } else {
        return res.json({ message: "Question key not found" });
      }
    });

    const updatedQuizDetails = await Quiz.findOneAndUpdate(
      { _id: quizId },
      quizDetails,
      { new: true }
    );

    if (!isQuestionAndAnswer) {
      return res.json({ message: "Poll" });
    }

    return res.json({ message: count });
  } catch (error) {
    console.error("Error updating impressions and selectedOptions:", error);
    next(error);
  }
};

const deleteQuiz = async (req, res, next) => {
  try {
    let quizId = req.params.quizId;
    quizId = quizId.replace(":", "");
    console.log(quizId);

    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    return res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getQuiz = async (req, res, next) => {
  try {
    let quizId = req.params.quizId.replace(":", "");

    const quizDetails = await Quiz.findById(quizId, {
      quiz: 1,
      timer: 1,
      _id: 0,
    });

    if (!quizDetails) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const timer = quizDetails.timer || "0";

    const quiz = Object.keys(quizDetails.quiz).reduce((acc, key) => {
      acc[key] = {
        question: quizDetails.quiz[key].question,
        option: quizDetails.quiz[key].option,
      };
      return acc;
    }, {});

    res.json({ quiz, timer });
  } catch (error) {
    next(error);
  }
};

const getUserQuiz = async (req, res, next) => {
  try {
    let userId = req.params.userId.replace(":", "");

    if (!userId) {
      return res.status(400).json({
        errorMessage: "Bad Request",
      });
    }

    const quizDetails = await Quiz.find({ userId });
    res.json({ data: quizDetails });
  } catch (error) {
    next(error);
  }
};

const getTrendingQuiz = async (req, res, next) => {
  try {
    const allQuizzes = await Quiz.find();

    if (!allQuizzes || allQuizzes.length === 0) {
      return res.status(404).json({ message: "No quizzes found" });
    }

    let totalQuiz = allQuizzes.length;
    let totalImpressions = 0;
    let totalQuestion = 0;

    allQuizzes.forEach((quiz) => {
      totalImpressions += parseInt(quiz.impressions || 0);
      totalQuestion += Object.keys(quiz.quiz).length;
    });

    const filteredQuizzes = allQuizzes.filter((quiz) => quiz.impressions > 10);

    const sortedQuizzes = filteredQuizzes.sort(
      (a, b) => b.impressions - a.impressions
    );

    let topQuizzes = sortedQuizzes.map(
      ({ quizName, impressions, createdOn }) => ({
        quizName,
        impressions: convertToKFormat(impressions),
        createdOn,
      })
    );

    if (topQuizzes.length > 12) {
      topQuizzes = topQuizzes.slice(0, 12);
    }

    let num = convertToKFormat(totalImpressions);

    res.json({
      Trending: {
        totalQuiz: totalQuiz,
        totalImpressions: num,
        totalQuestion: totalQuestion,
        topQuizzes: topQuizzes,
      },
    });
  } catch (error) {
    next(error);
  }
};

const convertToKFormat = (impressions) => {
  if (parseInt(impressions) >= 1000) {
    let num = parseInt(impressions) / 1000;
    num = num.toFixed(1);
    if (num.endsWith(".0")) {
      num = num.slice(0, -2);
    }
    return num + "k";
  }
  return impressions;
};

const getImpression = async (req, res, next) => {
  try {
    let quizId = req.params.quizId.replace(":", "");
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const {
      questionOrPoll,
      impressions,
      quiz: quizData,
      quizName,
      createdOn,
    } = quiz;
    let analysis = {};

    for (const key in quizData) {
      const { question, answer, selectedOptions } = quizData[key];

      if (questionOrPoll === "Poll") {
        analysis[key] = { question, selectedOptions };
      } else if (questionOrPoll === "Q & A") {
        const correct = selectedOptions?.[answer] || 0;
        const incorrect = String(impressions - correct);
        analysis[key] = { question, correct, incorrect };
      }
    }
    let num;
    if (parseInt(impressions) >= 1000) {
      num = parseInt(impressions) / 1000;
      num = num.toFixed(1);

      if (num.endsWith(".0")) {
        num = num.slice(0, -2);
      }
      num += "k";
    }

    const response = {
      createdOn,
      quizName,
      impression: num ? num : impressions,
      questionOrPoll,
      analysis,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

const getLastQuizIdByUser = async (req, res, next) => {
  try {
    let userId = req.params.userId.replace(":", "");
    const latestQuiz = await Quiz.findOne({ userId }).sort({ createdAt: -1 });

    if (!latestQuiz) {
      return null;
    }

    res.json({ id: latestQuiz._id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postCreateQuiz,
  putEditQuiz,
  putImpression,
  deleteQuiz,
  getQuiz,
  getUserQuiz,
  getTrendingQuiz,
  getImpression,
  getLastQuizIdByUser,
};
