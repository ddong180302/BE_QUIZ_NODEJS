import quizService from "../services/quizService";

const getQuizByParticipant = async (req, res) => {

    try {
        const token = req.headers.authorization;
        const data = await quizService.getQuizByParticipant(token);
        return res.status(200).json({
            data
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: -1,
            data: "",
            errMessage: "Not authenticated the user"
        })
    }
}

const postCraeteNewQuiz = async (req, res) => {
    try {
        let { name, description, difficulty } = req.body;
        let image = req.file.buffer;
        let response = await quizService.postCraeteNewQuiz(name, description, difficulty, image)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: "Error from the server"
        })
    }
}

const getQuestionsByQuizId = async (req, res) => {
    try {
        let data = await quizService.getQuestionsByQuizId(req.query.quizId);
        return res.status(200).json({
            data
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: "Error from the server"
        })
    }
}

const submitQuiz = async (req, res) => {
    try {
        const quizId = req.body.quizId;
        const token = req.headers.authorization;
        const answers = req.body.answers;
        const result = await quizService.submitQuiz(quizId, answers, token);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: -1,
            data: "",
            errMessage: "Not authenticated the user"
        })
    }
}

const getAllQuiz = async (req, res) => {
    try {
        const token = req.headers.authorization;
        let data = await quizService.getAllQuiz(token)
        res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Not authenticated the user",
            data: ""
        })
    }
}

module.exports = {
    getQuizByParticipant,
    postCraeteNewQuiz,
    getQuestionsByQuizId,
    submitQuiz,
    getAllQuiz
}