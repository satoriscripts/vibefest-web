import { Center, Group, Text } from "@mantine/core";
import { motion } from "framer-motion";

// @ts-ignore creator didn't include types `@types/react-twitch-embed` >:( i also dont think that they maintain it anymore sooooooooo!!!!!!!!
import { TwitchPlayer } from "react-twitch-embed";

export default function LiveNow({ artist }: { artist?: string }) {
  return (
    <motion.div
      //  framer motion fade in down smooth
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <a
        href="https://twitch.tv/VIBEFESTLIVE"
        style={{
          textDecoration: "none",
        }}
      >
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
      </a>

      <Center>
        <TwitchPlayer
          channel="vibefestlive"
          id="vibefestlive"
          theme="dark"
          width="100%"
          onVideoPause={() => console.log(":(")}
        />
      </Center>
    </motion.div>
  );
}
