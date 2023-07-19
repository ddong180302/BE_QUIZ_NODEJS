import db from "../models/index";
import bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken');

const getQuizByParticipant = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!token) {
                resolve({
                    errCode: -1,
                    data: "",
                    errMessage: "Not authenticated the user"
                })
            }
            const access_token = token.split(" ")[1];
            let decoded = jwt.verify(access_token, process.env.JWT_ACCESS_KEY);
            if (decoded) {
                let data = await db.Quiz.findAll({
                    attributes: ['id', 'description', 'image'],
                    include: [
                        { model: db.Participant_Quiz, as: 'ParticipantQuiz', attributes: ['quizId', 'participantId', 'isFinish', 'timeStart', 'timeEnd'], where: { participantId: decoded.id } },
                    ],
                    raw: true,
                    nest: true
                })
                if (!data) {
                    data = []
                }
                if (data) {
                    for (let i = 0; i < data.length; i++) {
                        //console.log('check image: ', data[i].description)
                        if (data[i].image) {
                            data[i].image = await new Buffer.from(data[i].image, 'binary').toString('base64');
                        } else {
                            data[i].image = '';
                        }
                    }
                }
                if (data) {
                    for (let i = 0; i < data.length; i++) {
                        //console.log('check image: ', data[i].ParticipantQuiz.isFinish)
                        //data[i].ParticipantQuiz.isFinish === 0 ? 'false' : 'true'
                        if (data[i].ParticipantQuiz.isFinish === 0) {
                            data[i].ParticipantQuiz.isFinish = false
                        } else {
                            data[i].ParticipantQuiz.isFinish = true
                        }
                    }
                }
                resolve({
                    data: data,
                    errCode: 0,
                    errMessage: "Ok"
                })
            } else {
                resolve({
                    errCode: 2,
                    data: "",
                    errMessage: "Not authenticated the user"
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

const postCraeteNewQuiz = (name, description, difficulty, image) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!name || !description || !difficulty) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required prameters'
                })
            }

            await db.Quiz.create({
                name: name,
                description: description,
                difficulty: difficulty,
                image: image
            });
            resolve({
                errCode: 0,
                errMessage: 'ok! create a new user succeed!'
            })
        } catch (e) {
            reject(e);
        }
    })
}

const getQuestionsByQuizId = (quizId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!quizId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let data = await db.Quiz_Question.findAll({
                    where: {
                        quizId: quizId
                    },
                    //group: ['id'],
                    attributes: ['description', 'id', 'image'],
                    include: [
                        { model: db.Quiz_Answer, as: 'answerData', attributes: ['id', 'description'] }
                    ],
                    raw: true,
                    nest: true
                })
                console.log(data)
                if (data) {
                    for (let i = 0; i < data.length; i++) {
                        //console.log('check image: ', data[i].description)
                        if (data[i].image) {
                            data[i].image = await new Buffer.from(data[i].image, 'binary').toString('base64');
                        } else {
                            data[i].image = '';
                        }
                    }
                }
                resolve({
                    errCode: 0,
                    data: data,
                    errMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const submitQuiz = (quizId, answers, token) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!token) {
                resolve({
                    errCode: -1,
                    data: "",
                    errMessage: "Not authenticated the user"
                })
            }
            const access_token = token.split(" ")[1];
            let decoded = jwt.verify(access_token, process.env.JWT_ACCESS_KEY);
            if (decoded) {
                let dataa = await db.Quiz_Answer.findAll({
                    attributes: ['id', 'description', 'correctAnswer', 'quizQuestionId'],
                    raw: true,
                });
                if (!quizId || !answers) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Missing required prameters'
                    })
                }
                const data = {
                    countTotal: 10,
                    countCorrect: 9,
                }
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

const getAllQuiz = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!token) {
                resolve({
                    errCode: -1,
                    data: "",
                    errMessage: "Not authenticated the user"
                })
            }
            const access_token = token.split(" ")[1];
            let decoded = jwt.verify(access_token, process.env.JWT_ACCESS_KEY);
            if (decoded) {
                let data = await db.Quiz.findAll({
                    order: [['id', 'DESC']],
                    raw: true,
                    nest: true
                })
                for (let i = 0; i < data.length; i++) {
                    if (data[i].image) {
                        data[i].image = await new Buffer.from(data[i].image, 'binary').toString('base64');
                    } else {
                        data[i].image = '';
                    }
                }
                if (data) {
                    resolve({
                        data: data,
                        errCode: 0,
                        errMessage: "Get All Data Quiz the succeed"
                    })
                } else {
                    data = {}
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getQuizByParticipant,
    postCraeteNewQuiz,
    getQuestionsByQuizId,
    submitQuiz,
    getAllQuiz
}