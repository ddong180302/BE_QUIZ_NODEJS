import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import middlewareController from "../controllers/middlewarController";
import quizController from "../controllers/quizController";
import participantQuizController from "../controllers/participantQuizController";
const multer = require('multer');
const router = express.Router();


const upload = multer();

let initWebRoutes = (app) => {
    //participant
    router.post('/api/v1/participant', upload.single('image'), userController.createANewUser)
    router.get('/api/v1/participant/all', userController.getAllUser)
    router.get('/api/v1/participant/pagination', userController.getUserPagination)
    router.put('/api/v1/participant/edit', upload.single('image'), userController.getEditUser)
    router.delete('/api/v1/participant/:id', middlewareController.verifyTokenAndAdminAuth, userController.deleteAUser)

    //auth
    router.post('/api/v1/login', userController.handleLogin)
    router.post('/api/v1/register', userController.handleRegister)

    //Quiz
    router.get('/api/v1/quiz-by-participant', quizController.getQuizByParticipant)
    router.get('/api/v1/get-all-quiz', quizController.getAllQuiz)
    router.post('/api/v1/create-new-quiz', upload.single('image'), quizController.postCraeteNewQuiz)
    router.post('/api/v1/quiz-submit', quizController.submitQuiz)

    //questions
    router.get('/api/v1/questions-by-quiz', quizController.getQuestionsByQuizId)

    //participant quiz
    router.get('/api/v1/create-participant-quiz', participantQuizController.createParticipantQuiz)


    return app.use("/", router);
}


module.exports = initWebRoutes;
