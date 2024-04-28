const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const TasksLog = sequelize.define(
      'TasksLog',
      {
        taskLogId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        taskId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Tasks',
            key: 'taskId',
          },
        },
        statusId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'TasksStatus',
            key: 'statusId',
          },
        },
        changedBy: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Users',
            key: 'userId',
          },
        },
        changedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
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
  
    return TasksLog;
  };