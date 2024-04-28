const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Tasks = sequelize.define(
    'Tasks',
    {
      taskId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Projects',
          key: 'projectId',
        },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE', 
      },
      taskName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      taskDescription: {
        type: DataTypes.TEXT,
        allowNull: true, 
      },
      statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'TaskStatus',
          key: 'statusId',
        },
        onDelete: 'SET NULL', 
        onUpdate: 'CASCADE', 
      },
      assignedTo: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'SET NULL', 
        onUpdate: 'CASCADE', 
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

  return Tasks;
};
