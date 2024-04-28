'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create TaskStatus table
    await queryInterface.createTable('TaskStatus', {
      statusId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false, // Since there are predefined statuses, auto-increment is disabled
      },
      statusName: {
        type: Sequelize.STRING(50),
        allowNull: false,
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

    // Seed the table with predefined statuses
    await queryInterface.bulkInsert('TaskStatus', [
      { statusId: 1, statusName: 'To Do', createdAt: new Date(), updatedAt: new Date() },
      { statusId: 2, statusName: 'In Progress', createdAt: new Date(), updatedAt: new Date() },
      { statusId: 3, statusName: 'Done', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the TaskStatus table
    await queryInterface.dropTable('TaskStatus');
  },
};
