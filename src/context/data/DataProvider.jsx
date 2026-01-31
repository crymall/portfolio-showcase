import { useState, useCallback } from "react";
import { notifications } from "@mantine/notifications";
import DataContext from "./DataContext";
import api from "../../services/api";

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setUsersLoading(true);
    try {
      const res = await api.get("/users");
      setUsers(res.data.users);
    } catch (err) {
      console.error("Fetch users failed", err);
    } finally {
      setUsersLoading(false);
    }
  }, []);

  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
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

  return (
    <DataContext.Provider
      value={{
        users,
        usersLoading,
        fetchUsers,
        deleteUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
