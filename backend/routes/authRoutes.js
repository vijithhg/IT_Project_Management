
const express = require('express');
const authRouter = express.Router();
const { register, login, resetPassword } = require("../controllers/authController");
const { adminAuth } = require('../middlewares/adminAuth');




authRouter.post('/register', adminAuth, register)
authRouter.post('/login', login)
authRouter.post('/reset-password', resetPassword)


module.exports= authRouter