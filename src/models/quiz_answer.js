'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Quiz_Answer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Quiz_Answer.belongsTo(models.Quiz_Question, { foreignKey: 'quizQuestionId', targetKey: 'id', as: 'answerData' }) //targetKey: 'id'
        }
    };
    Quiz_Answer.init({
        description: DataTypes.TEXT,
        correctAnswer: DataTypes.BOOLEAN,
        deletedAt: DataTypes.DATE,
        quizQuestionId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Quiz_Answer',
    });
    return Quiz_Answer;
};