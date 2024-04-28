const { roles } = require("../constants/constants")
const { user } = require("../sequelize")

const getAllDevelopers=async(req,res)=>{
    try{
        const developersList = await user.findAll({where:{roleId:roles.DEVELOPER}})
        return res.status(200).json(developersList)
    }catch(error){
        return res.status(500).json({message:'Internal Server Error'})
    }
}

const getAllManagers=async(req,res)=>{
    try{
        const ManagersList = await user.findAll({where:{roleId:roles.MANAGER}})
        return res.status(200).json(ManagersList)
    }catch(error){
        return res.status(500).json({message:'Internal Server Error'})
    }
}

module.exports={getAllDevelopers, getAllManagers}