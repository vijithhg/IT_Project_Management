/* eslint-disable react/jsx-key */
import { useState } from "react";
import Projects from "../services/Projects";
import { useEffect } from "react";
import Modal from "react-modal";
import AddProject from "./AddProject";
import AssignMembers from "./AssignMembers";

const ProjectList = () => {
  const [projectList, setProjectList] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const getAllProject = async () => {
    try {
      const projectResponse = await Projects.getAll();
      setProjectList(projectResponse.rows);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProject();
  }, []);

  
  const submitHandler = (id) => {
    setSelectedProjectId(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedProjectId(null);
    setModalIsOpen(false);
  };

  return (
    <div>
      <AddProject/>
      
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Creation Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projectList?.map((project) => {
            const { projectId, projectName, createdAt } = project;
            return (
              <tr key={projectId}>
                <td>{projectName}</td>
                <td>{createdAt}</td>
                <td>
                  <button className="btn btn-outline-primary" onClick={()=>submitHandler(projectId)}>
                    Assign Members
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

           {/* Modal */}
      {/* React Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Assign Task"
      >
        <h2>Assign Members</h2>
        <p>Project ID:{selectedProjectId}</p>
        <AssignMembers selectedProjectId={selectedProjectId}/>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default ProjectList;
