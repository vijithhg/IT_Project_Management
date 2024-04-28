/* eslint-env es6 */
const { Sequelize } = require('sequelize');
const config = require('./config/config.json');
const userModel = require('./models/Users')
const projectModel = require('./models/Projects')
const userProjectModel = require('./models/UserProjects')
const taskModel = require('./models/Tasks')

const dbConfig = config.development

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    timezone: '+05:30', // Adjust according to your timezone
  });


const user = userModel(sequelize,Sequelize)
const project = projectModel(sequelize, Sequelize)
const userProject = userProjectModel(sequelize, Sequelize)
const task = taskModel(sequelize,Sequelize)



// Define associations between models
user.hasMany(project,{foreignKey:'createdBy', as:'userInfo'})
project.belongsTo(user, { foreignKey: 'createdBy', as:'createdUserInfo'});

project.hasMany(task,{foreignKey:'projectId'})
task.belongsTo(project,{foreignKey:'projectId', as:'projectInfo'})


module.exports =   {
    sequelize,
    user,
    project,
    userProject,
    task
    
} 
    
