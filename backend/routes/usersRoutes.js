const express = require('express')
const userRouter = express.Router()
const { getAllDevelopers, getAllManagers } = require('../controllers/userController')


userRouter.get('/developer', getAllDevelopers)
userRouter.get('/manager', getAllManagers)


module.exports = userRouter