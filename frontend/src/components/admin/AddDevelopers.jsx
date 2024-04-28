import { useEffect, useState } from "react";
import Users from "../services/Users";

const AddDevelopers = () => {
  const [allDevelopers, setAllDevelopers] = useState();
  const fetchDevelopers = async () => {
    try {
      const responseDevelopers = await Users.getAllDevelopers();
      setAllDevelopers(responseDevelopers);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDevelopers();
  }, []);

  return (
    <>
      <h2>DevelopersList</h2>
      {/* Add Developer */}
      <input type="text" placeholder="name"/>
      <input type="email" placeholder="email"/>
      <button>Add Developer</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        {allDevelopers?.map((dev) => {
          return (
            <tr key={dev.userId}>
              <td>{dev.name}</td>
              <td>{dev.email}</td>
            </tr>
          );
        })}
      </table>
    </>
  );
};

export default AddDevelopers;
