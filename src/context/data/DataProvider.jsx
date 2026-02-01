import { useState, useCallback } from "react";
import { notifications } from "@mantine/notifications";
import DataContext from "./DataContext";
import * as iamApi from "../../services/iamApi";

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
      notifications.show({
        title: "Simulation",
        message: 'User "deleted" (refresh to reset)',
        color: "orange",
      });
    } catch {
      notifications.show({
        title: "Error",
        message: "Permission Denied",
        color: "red",
      });
    }
  };

  const updateUserRole = async (userId, role) => {
    try {
      await iamApi.updateUserRole(userId, role);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role } : u))
      );
      notifications.show({
        title: "Success",
        message: "User role updated",
        color: "green",
      });
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to update role",
        color: "red",
      });
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
