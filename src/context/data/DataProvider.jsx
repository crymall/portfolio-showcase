import { useState, useCallback } from "react";
import DataContext from "./DataContext";
import * as iamApi from "../../services/iamApi";
import { ROLES } from "../../constants/roles";

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setUsersLoading(true);
    try {
      const data = await iamApi.fetchUsers();
      setUsers(data.users);
    } catch (err) {
      console.error("Fetch users failed", err);
    } finally {
      setUsersLoading(false);
    }
  }, []);

  const deleteUser = async (id) => {
    try {
      await iamApi.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Delete user failed", err);
    }
  };

  const updateUserRole = async (userId, roleId) => {
    try {
      await iamApi.updateUserRole(userId, roleId);
      const roleName = Object.keys(ROLES).find((key) => ROLES[key] === roleId);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: roleName } : u))
      );
    } catch (err) {
      console.error("Update user role failed", err);
    }
  };

  return (
    <DataContext.Provider
      value={{
        users,
        usersLoading,
        fetchUsers,
        deleteUser,
        updateUserRole,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
