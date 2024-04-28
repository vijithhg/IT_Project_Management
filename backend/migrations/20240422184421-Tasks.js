'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      taskId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Projects',
          key: 'projectId',
        },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE', 
      },
      taskName: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      taskDescription: {
        type: Sequelize.TEXT,
        allowNull: true, 
      },
      statusId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'TaskStatus',
          key: 'statusId',
        },
        onDelete: 'SET NULL', 
        onUpdate: 'CASCADE', 
      },
      assignedTo: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'SET NULL', 
        onUpdate: 'CASCADE', 
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW, 
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW, 
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks'); 
  },
};
