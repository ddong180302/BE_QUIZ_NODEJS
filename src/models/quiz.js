'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Quiz extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Quiz.hasMany(models.Participant_Quiz, { foreignKey: 'quizId', as: 'ParticipantQuiz' })
            Quiz.hasMany(models.Quiz_Question, { foreignKey: 'quizId', as: 'questionData' })
        }
    };
    Quiz.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        image: DataTypes.BLOB('long'),
        difficulty: DataTypes.STRING,
        deletedAt: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Quiz',
    });
    return Quiz;
};