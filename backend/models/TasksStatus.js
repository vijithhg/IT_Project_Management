const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TasksStatus = sequelize.define(
    'TaskStatus',
    {
      statusId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false, 
      },
      statusName: {
        type: DataTypes.STRING(50),
        allowNull: false,
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

  return TasksStatus;
};