import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import Users from "../services/Users";
import Projects from "../services/Projects";
import { toast } from "react-toastify";

const AssignMembers = ({selectedProjectId}) => {
  const [selected, setSelected] = useState([]);
  const [selectedManager, setSelectedManager] = useState([]);
  const [managerList, setManagerList] = useState([]);
  const [developerList, setDeveloperList] = useState([]);
  const allManagerList = async () => {
    try {
      const responseManager = await Users.getAllMangers();
      setManagerList(responseManager);
    } catch (error) {
      console.log(error);
    }
  };
  const allDeveloperList = async () => {
    try {
      const responseDeveloper = await Users.getAllDevelopers();
      const formattedDevelopers = responseDeveloper?.map((dev) => ({
        label: `${dev.email}`,
        value: dev.userId,
      }));
      setDeveloperList(formattedDevelopers);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    allManagerList();
    allDeveloperList();
  }, []);

  const submitHandler =async()=>{
    const formData = {
       userId : [Number(...selectedManager),...selected?.map((dev)=>dev.value)],
       projectId : selectedProjectId
    }

    try{
        const responseAssign = await Projects.projectAssign(formData)
        if(responseAssign.success){
            toast.success(responseAssign.message)
        }
    }catch(error){
        console.log(error)
    }
  }
  return (
    <>
      <h2>Assign Members</h2>
      <select
        onChange={(e) => setSelectedManager(e.target.value)}
        value={selectedManager}
      >
        <option>Select Manager</option>
        {managerList?.map((manager) => {
          return (
            <option key={manager.userID} value={manager.userId}>
              {manager.email}
            </option>
          );
        })}
      </select>
      <MultiSelect
        options={developerList}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />

      <button onClick={submitHandler}>Submit</button>
    </>
  );
};

export default AssignMembers;
