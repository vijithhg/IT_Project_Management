'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create Projects table
    await queryInterface.createTable('Projects', {
      projectId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      projectName: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'userId',
        },
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
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the Projects table
    await queryInterface.dropTable('Projects');
  },
};
