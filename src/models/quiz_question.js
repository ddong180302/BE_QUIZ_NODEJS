'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Quiz_Question extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Quiz_Question.hasMany(models.Quiz_Answer, { foreignKey: 'quizQuestionId', as: 'answerData' })
            Quiz_Question.belongsTo(models.Quiz, { foreignKey: 'quizId', targetKey: 'id', as: 'questionData' }) //targetKey: 'id'
        }
    };
    Quiz_Question.init({
        description: DataTypes.TEXT,
        image: DataTypes.BLOB('long'),
        deletedAt: DataTypes.DATE,
        quizId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Quiz_Question',
    });
    return Quiz_Question;
};