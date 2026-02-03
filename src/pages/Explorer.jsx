import { SimpleGrid, Stack, Text, Paper, Group, Button } from "@mantine/core";
import { IconFileText, IconFolder } from "@tabler/icons-react";

const Explorer = () => {
  const files = [
    { name: "My Projects", icon: IconFolder },
    { name: "Resume.doc", icon: IconFileText },
    { name: "Notes.txt", icon: IconFileText },
    { name: "Games", icon: IconFolder },
  ];

  return (
    <Paper p={4}>
      <Group bg="#000080" p={2} justify="space-between" mb={2}>
        <Text c="white" fw="bold" size="sm" px={4}>
          C:\Midden
        </Text>
        <Button size="xs" px={0} w={20} h={20}>
          X
        </Button>
      </Group>

      <Group gap="sm" px={8} py={2} mb={4}>
        <Text size="sm">File</Text>
        <Text size="sm">Edit</Text>
        <Text size="sm">View</Text>
        <Text size="sm">Help</Text>
      </Group>

      <Paper variant="inset" p="md" minH={400}>
        <SimpleGrid cols={{ base: 3, sm: 6 }} spacing="lg">
          {files.map((file, index) => (
            <Stack
              key={index}
              align="center"
              gap={4}
              style={{ cursor: "pointer", userSelect: "none" }}
            >
              <file.icon size={48} stroke={1} color="black" />
              <Text size="sm" ta="center" c="black">
                {file.name}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Paper>
    </Paper>
  );
};

export default Explorer;