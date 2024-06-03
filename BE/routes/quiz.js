const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quiz");
const verifyToken = require("../middlewares/authMiddleware");

router.post("/create_quiz", verifyToken, quizController.postCreateQuiz);
router.put("/edit_quiz:quizId", verifyToken, quizController.putEditQuiz);
router.put("/post_impression:quizId", quizController.putImpression);

router.delete("/delete_quiz:quizId", verifyToken, quizController.deleteQuiz);

router.get("/user_quiz:userId", quizController.getUserQuiz);
router.get("/quiz:quizId", quizController.getQuiz);
router.get("/trending_quiz", quizController.getTrendingQuiz);
router.get("/get_impression:quizId", quizController.getImpression);
router.get("/get_last_quiz:userId", quizController.getLastQuizIdByUser);

module.exports = router;
