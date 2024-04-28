const { roles } = require("../constants/constants");
const { user, project, userProject } = require("../sequelize");

const getAllProjects = async (req, res) => {
  try {
    let includeOptions = [
      {
        model: user,
        required: true,
        attributes: ["email"],
        as: "createdUserInfo",
      },
    ];
    const allProjects = await project.findAndCountAll({
      include: includeOptions,
    });
    return res.status(200).json(allProjects);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createProject = async (req, res) => {
  try {
    const { projectName, createdBy } = req.body;
    // Valid Input
    if (!projectName || !createdBy) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //Ensure admin
    const isAdmin = await user.findOne({
      where: { userId: createdBy, roleId: roles.ADMIN },
    });
    if (!isAdmin) {
      return res
        .status(400)
        .json({ message: "Only Admin Can Create Projects" });
    }
    const projectData = await project.create({ projectName, createdBy });
    return res
      .status(201)
      .json({ success:true, message: "Project Created Successfully", projectData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const assignProject = async (req, res) => {
  try {
    const { userId, projectId } = req.body;
    console.log(userId, "userId");
    // Valid Input
    if (!userId || !projectId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userRoleInfo = await user.findAll({
      where: { userId },
      attributes: ["userId", "roleId"],
    });
    if (userRoleInfo.length !== userId.length) {
      return res
        .status(404)
        .json({ message: "One or more user IDs not found." });
    }
    const userProjectsInfo = await Promise.all(
      userRoleInfo.map(async (user) => {
        return await userProject.create({
          userId: user.userId,
          projectId,
          roleId: user.roleId,
        });
      })
    );
    return res
      .status(201)
      .json({ success:true, message: "Project Assigned Successfully", userProjectsInfo });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = { getAllProjects, createProject, assignProject };
