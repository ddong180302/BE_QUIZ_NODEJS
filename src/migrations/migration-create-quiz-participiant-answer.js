'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('quiz_participiant_answers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            participantId: {
                type: Sequelize.INTEGER
            },
            quizId: {
                type: Sequelize.INTEGER
            },
            quizQuestionId: {
                type: Sequelize.INTEGER
            },
            userAnswers: {
                type: Sequelize.STRING
            },
            deletedAt: {
                type: Sequelize.DATE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('quiz_participiant_answers');
    }
};