/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import Users from "../services/Users";
import Tasks from "../services/Tasks";
import { toast } from "react-toastify";

const AddTask = ({ projectId }) => {
  const [developers, setDevelopers] = useState([]);
  const [formData, setFormData] = useState({
    projectId: "",
    taskName: "",
    taskDescription: "",
    statusId: 1,
    assignedTo: "",
  });

  useEffect(() => {
    setFormData({ ...formData, projectId: projectId });
    DevelopersList();
  }, []);

  const DevelopersList = async () => {
    try {
      const responseDevelopers = await Users.getAllDevelopers();
      setDevelopers(responseDevelopers.developersList);
    } catch (error) {
      console.log(error);
    }
  };

  const addTaskHandler = async () => {
    try {
      const addTaskResponse = await Tasks.createTask(formData);
      console.log(addTaskResponse.success);
      if (addTaskResponse.success) {
        toast.success(addTaskResponse.message);
        setFormData({
          projectId: "",
          taskName: "",
          taskDescription: "",
          statusId: 1,
          assignedTo: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="TaskName"
        value={formData.taskName}
        onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
      ></input>
      <textarea
        type="text"
        placeholder="TaskDescription"
        value={formData.taskDescription}
        onChange={(e) =>
          setFormData({ ...formData, taskDescription: e.target.value })
        }
      ></textarea>
      <select
        onChange={(e) =>
          setFormData({ ...formData, assignedTo: e.target.value })
        }
        value={formData.assignedTo}
      >
        <option>Select Developers</option>
        {developers?.map((developers) => {
          const { userId, name } = developers;
          return <option value={userId}>{name}</option>;
        })}
      </select>
      <button onClick={addTaskHandler}>Add Task</button>
    </>
  );
};

export default AddTask;
