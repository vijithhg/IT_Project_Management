const express = require('express')
const { createTask, getAllTask, statusChange } = require('../controllers/taskController')
const { developerAuth } = require('../middlewares/developerAuth')
const taskRouter = express.Router()

taskRouter.get('', developerAuth, getAllTask)
taskRouter.post('', createTask)

taskRouter.post('/status_change', statusChange)



module.exports = taskRouter