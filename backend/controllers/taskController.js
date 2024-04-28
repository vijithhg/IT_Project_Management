
const { taskStatus } = require('../constants/constants');
const {task,user,project} = require('../sequelize')

const getAllTask=async(req,res)=>{
    const assignedTo = req.userId
    let includeOptions = [
        {
          model: project,
          required: true,
          attributes: ["projectName"],
          as: "projectInfo",
        },
      ];
    try{
        const todo = await task.findAndCountAll({
            where:{assignedTo,statusId:taskStatus.TODO},
            include:includeOptions
        })
        const inProgress = await task.findAndCountAll({
            where:{assignedTo,statusId:taskStatus.INPROGRESS},
            include:includeOptions
        })
        const done = await task.findAndCountAll({
            where:{assignedTo,statusId : taskStatus.DONE},
            include:includeOptions
        })
        const result = {
            message: 'All Tasks',
            todo: todo.rows,
            inProgress: inProgress.rows,
            done: done.rows
        };
        res.status(200).json(result)
    }catch(error){
        res.status(500).json({message: 'Internal Server Error'})
    }
}

const createTask = async(req,res)=>{
    try{
        const{projectId, taskName, taskDescription, statusId, assignedTo}=req.body
        //Valid input
        if(!projectId || !taskName || !statusId || !assignedTo){
            return res.status(400).json({ message: "All fields are required" });
        }
        const taskInfo = await task.create({projectId,taskName,taskDescription,statusId,assignedTo})

        res.status(201).json({success:true, message:'created', taskInfo})
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
}

const statusChange = async (req, res) => {
    try {
        const { taskId, statusId } = req.body;
        const taskFind = await task.findOne({ where: { taskId } });

        if (!taskFind) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await taskFind.update({statusId });

        return res.status(201).json({ message: 'Status changed', task: taskFind });
    } catch (error) {
        console.error('Error in statusChange:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports={createTask, getAllTask, statusChange}