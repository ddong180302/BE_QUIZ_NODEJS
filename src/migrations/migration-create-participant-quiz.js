'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('participant_quizzes', {
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
            isFinish: {
                type: Sequelize.BOOLEAN
            },
            timeStart: {
                type: Sequelize.DATE
            },
            timeEnd: {
                type: Sequelize.DATE
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
        await queryInterface.dropTable('participant_quizzes');
    }
};