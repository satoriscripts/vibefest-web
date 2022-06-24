import { Container } from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ApiClient } from "@twurple/api";
import { ClientCredentialsAuthProvider } from "@twurple/auth";
import ThreeJSRender from "~/components/3D";
import LiveNow from "~/components/LiveNow";
import { Spring } from "~/components/Spring";

type loaderFunctionData = {
  isLive: boolean;
  artist: string;
};

export const loader: LoaderFunction = async () => {
  const clientId = process.env.TWITCH_CLIENT_ID ?? "";
  const accessToken = process.env.TWITCH_SECRET ?? "";

  const authProvider = new ClientCredentialsAuthProvider(clientId, accessToken);
  const apiClient = new ApiClient({ authProvider });

  //  788286383 = vibefestlive
  //  56648155 = TwitchPlaysPokemon (always live, mean for dev)
  const stream = await apiClient.streams.getStreamByUserId("788286383");
  const isLive = stream !== null;
  const artist = stream?.title.split("|")[1] ?? "";

  return json<loaderFunctionData>({
    isLive,
    artist,
  });
};

export default function IndexPage() {
  const { isLive, artist } = useLoaderData<loaderFunctionData>();

  return (
    <Container>
      <div style={{ textAlign: "center" }}>
        {isLive ? <LiveNow artist={artist} /> : ""}

        <Spring>
          <div className="backgroundHover VIBEFEST_FONT">
            <h1>VIBEFEST「VOL. 2」</h1>
            <h2>JULY 9TH - JULY 10TH</h2>
            <h3>
              <a href="https://vrchat.com/home/user/usr_622720da-7685-4595-b0b1-5574497b7d60">
                IN VRCHAT
              </a>{" "}
              AND{" "}
              <a href="https://twitch.tv/VIBEFESTLIVE">STREAMED ON TWITCH</a>
            </h3>
            <h4>
              <a href="https://vibefest.store">CHARITY MERCH AVAILABLE</a>
            </h4>
          </div>
        </Spring>
      </div>
      <ThreeJSRender />
    </Container>
  );
}
