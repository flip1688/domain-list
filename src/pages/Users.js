import Header from "./Header";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Users = () => {
  const { fetchUsers, isAuthenticated } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (isAuthenticated()) {
      const getUsers = async () => {
        const usersData = await fetchUsers();
        setUsers(usersData);
      };
      getUsers();
    } 
  }, [fetchUsers, isAuthenticated]);

  return (
    <>
      <Header />
      <div className="container" style={{ textAlign: "-webkit-center" }}>
        <table className="table table-bordered table-striped mt-2">
          <thead>
            <tr>
              <th>#</th>
              <th>username</th>
              <th>name</th>
              <th>role</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
