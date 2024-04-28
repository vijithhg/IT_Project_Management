const { user } = require("../sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const { createTransporter } = require("../transporter/emailService");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { name, email, roleId } = req.body;
    //Valid Input
    if (!name || !email || !roleId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    //Checking existing user
    const existingUser = await user.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "Email Already Exist" });
    }
    const password = uuidv4();
    //Password hasing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    //User creation
    const UserData = await user.create({
      name,
      email,
      password: hashedPassword,
      roleId,
    });
    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
            const transporter = createTransporter()
            const passwordSet = `${process.env.BASE_FRONTEND_URL}reset-password?token=${token}`;
            // Send email
            await transporter.sendMail({
                from: process.env.EMAIL_SENDER,
                to: email,
                subject: 'Welcome to IT Management System',
                html: `Click <a href="${passwordSet}">here</a> to reset your password. This link is valid for 1 hour.`,
            });
          return res.status(200).json({success:true, message:'Password Reset Link Sent to Email'})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Valid Input
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    //existing user
    const existingUser = await user.findOne({ where: { email } });

    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!comparePassword) {
      return res
        .status(400)
        .json({ success: false, message: "Email or Password invalid" });
    }
    const token = jwt.sign(
      { userId: existingUser.userId, userRole: existingUser.roleId },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Redirect users based on their roles
    switch (existingUser.roleId) {
      case 1:
        return res.json({
          success: true,
          message: "login successfully",
          token,
          redirectTo: "/admin",
        });
      case 2:
        return res.json({
          success: true,
          message: "login successfully",
          token,
          redirectTo: "/manager",
        });
      case 3:
        return res.json({
          success: true,
          message: "login successfully",
          token,
          redirectTo: "/developer",
        });
      default:
        return res.json({
          success: true,
          message: "role not specified",
          token,
          redirectTo: "/",
        });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const resetPassword=async(req,res)=>{
  const{token}=req.query
  console.log(token,'token')
  
  const { newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password are required' });
    
  }

  try{

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userToUpdate = await user.findOne({ where: { email: decodedToken.email } });
    if (!userToUpdate) {
      return res.status(404).json({ error: 'User not found' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userToUpdate.update({ password: hashedPassword})
    res.status(200).json({success:true, message:'Password Reset Successfully'})
  }catch(error){
    console.log(error)
  }
}

module.exports = { register, login, resetPassword};
