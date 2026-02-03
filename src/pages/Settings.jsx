import { useEffect } from "react";
import { Tabs, TextInput, Stack, Title } from "@mantine/core";
import useAuth from "../context/auth/useAuth";
import useData from "../context/data/useData";
import UserList from "../components/UserList";
import Can from "../components/Can";

const Settings = () => {
  const { user } = useAuth();
  const { fetchUsers } = useData();

  useEffect(() => {
    if (user && user.permissions.includes("read:users")) {
      fetchUsers();
    }
  }, [fetchUsers, user]);

  return (
    <Tabs defaultValue="profile">
      <Tabs.List>
        <Tabs.Tab value="profile">Profile</Tabs.Tab>
        <Can perform="read:users">
          <Tabs.Tab value="admin">Admin Panel</Tabs.Tab>
        </Can>
      </Tabs.List>

      <Tabs.Panel value="profile">
        <Title order={4} mb="md">User Information</Title>
        <Stack gap="md" maw={400}>
          <TextInput label="Username" value={user.username} readOnly />
          <TextInput label="Email" value={user.email || ''} readOnly />
        </Stack>
      </Tabs.Panel>

      <Tabs.Panel value="admin">
        <Can perform="read:users">
          <UserList />
        </Can>
      </Tabs.Panel>
    </Tabs>
  );
};

export default Settings;