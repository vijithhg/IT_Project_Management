'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create Roles table
    await queryInterface.createTable('Roles', {
      roleId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      roleName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
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

     // Seed the table with predefined roles
     await queryInterface.bulkInsert('roles', [
      { roleId: 1, roleName: 'Admin', createdAt: new Date(), updatedAt: new Date() },
      { roleId: 2, roleName: 'Manager', createdAt: new Date(), updatedAt: new Date() },
      { roleId: 3, roleName: 'Developer', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the Roles table
    await queryInterface.dropTable('Roles');
  },
};
