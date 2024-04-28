'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create TasksLog table
    await queryInterface.createTable('TasksLog', {
      taskLogId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      taskId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tasks',
          key: 'taskId',
        },
        allowNull: false,
        onDelete: 'CASCADE', // Optional: Cascade delete when related task is removed
      },
      statusId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'TaskStatus',
          key: 'statusId',
        },
        allowNull: false,
      },
      changedBy: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'userId',
        },
        allowNull: false,
      },
      changedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the TasksLog table
    await queryInterface.dropTable('TasksLog');
  },
};
