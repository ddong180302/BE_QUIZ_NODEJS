'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Participant_Quiz extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Participant_Quiz.belongsTo(models.Quiz, { foreignKey: 'quizId', targetKey: 'id', as: 'ParticipantQuiz' })
            Participant_Quiz.belongsTo(models.Participant, { foreignKey: 'participantId', targetKey: 'id', as: 'participantData' }) //targetKey: 'id',
        }
    };
    Participant_Quiz.init({
        participantId: DataTypes.INTEGER,
        quizId: DataTypes.INTEGER,
        isFinish: DataTypes.BOOLEAN,
        timeStart: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
        timeEnd: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Participant_Quiz',
    });
    return Participant_Quiz;
};