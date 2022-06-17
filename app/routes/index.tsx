import { Container } from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";
import { ApiClient, ClientCredentialsAuthProvider } from "twitch";
import ThreeJSRender from "~/components/3D";
import LiveNow from "~/components/LiveNow";

export const loader: LoaderFunction = async () => {
  const clientId = process.env.TWITCH_CLIENT_ID ?? "";
  const accessToken = process.env.TWITCH_SECRET ?? "";

  const authProvider = new ClientCredentialsAuthProvider(clientId, accessToken);
  const apiClient = new ApiClient({ authProvider });

  //  788286383 = vibefestlive
  //  56648155 = TwitchPlaysPokemon (always live, mean for dev)
  const stream = await apiClient.helix.streams.getStreamByUserId("788286383");
  const channelPage = await apiClient.helix.channels.getChannelInfo(
    "788286383"
  );
  const isLive = stream !== null;

  const artist = channelPage?.title.split("|")[1] ?? "";
  console.log(artist);

  return {
    isLive,
    artist,
  };
};

export default function IndexPage() {
  const { isLive, artist } = useLoaderData();

  return (
    <Container>
      <div style={{ textAlign: "center" }}>
        {isLive ? <LiveNow artist={artist} /> : ""}

        <motion.div
          whileHover={{
            backgroundColor: "rgba(0, 0, 0, 0.30)",
          }}
        >
          <h1>VIBEFEST「VOL. 2」</h1>
          <h2>JULY 9TH - JULY 10TH</h2>
          <h3>
            <a href="https://vrchat.com/home/user/usr_622720da-7685-4595-b0b1-5574497b7d60">
              IN VRCHAT
            </a>{" "}
            AND <a href="https://twitch.tv/VIBEFESTLIVE">STREAMED ON TWITCH</a>
          </h3>
        </motion.div>
      </div>
      <ThreeJSRender />
    </Container>
  );
}
