const express = require('express')
const projectRouter = express.Router()
const { createProject, getAllProjects, assignProject } = require('../controllers/projectController')
const { managerAuth } = require('../middlewares/managerAuth')


projectRouter.get('', getAllProjects)
projectRouter.post('',createProject)
projectRouter.post('/assign', assignProject)


module.exports = projectRouter