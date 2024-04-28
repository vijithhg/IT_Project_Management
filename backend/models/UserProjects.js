const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserProjects = sequelize.define(
    'UserProjects',
    {
      userProjectId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
          model: 'Users',
          key: 'userId',
        },
      },
      projectId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Projects',
          key: 'projectId',
        },
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
          model: 'Users',
          key: 'roleId',
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
      timestamps: false,
    }
  );

  return UserProjects;
};
