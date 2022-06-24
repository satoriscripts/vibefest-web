import { Group, Text } from "@mantine/core";

export default function PlayingArtist({ artist }: { artist: string }) {
  return (
    <Group
      grow
      position="center"
      className="box"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.30)",
        borderRadius: "8px",
        border: "1px solid rgba(250, 0, 0, 0.50)",
      }}
      m="xl"
      p="md"
    >
      <Text className="VIBEFEST_FONT" size="xl">
        🔴 VIBEFEST is LIVE! {artist ?? ""}
      </Text>
    </Group>
  );
}
