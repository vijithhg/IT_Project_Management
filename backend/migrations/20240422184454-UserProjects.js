"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create UserProjects table
    await queryInterface.createTable("UserProjects", {
      userProjectId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "userId",
        },
        allowNull: false,
        onDelete: "CASCADE", // Optional: Ensures user-related entries are removed if the user is deleted
      },
      projectId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Projects",
          key: "projectId",
        },
        allowNull: false,
        onDelete: "CASCADE", // Optional: Ensures project-related entries are removed if the project is deleted
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Roles",
          key: "roleId",
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
    // Drop UserProjects table
    await queryInterface.dropTable("UserProjects");
  },
};
