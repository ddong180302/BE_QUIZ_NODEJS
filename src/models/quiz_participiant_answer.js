'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Quiz_Participiant_Answer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Quiz_Participiant_Answer.init({
        participantId: DataTypes.INTEGER,
        quizId: DataTypes.INTEGER,
        quizQuestionId: DataTypes.INTEGER,
        userAnswers: DataTypes.STRING,
        deletedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Quiz_Participiant_Answer',
    });
    return Quiz_Participiant_Answer;
};