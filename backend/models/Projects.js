const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Projects = sequelize.define(
    'Projects',
    {
      projectId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      projectName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'userId',
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: true,
    }
  );

  return Projects;
};