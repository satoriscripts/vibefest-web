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
  console.log(isLive);

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
            <h1>VIBEFEST「VOL. 3」</h1>
            <h2>OCTOBER 15TH</h2>
            <h3>
              <a href="https://vrchat.com/home/user/usr_622720da-7685-4595-b0b1-5574497b7d60">
                IN VRCHAT
              </a>{" "}
              AND{" "}
              <a href="https://twitch.tv/VIBEFESTLIVE">STREAMED ON TWITCH</a>
            </h3>
            <p>
              <a href="https://discord.gg/9rJ5RKvn2J">JOIN OUR DISCORD</a>
              <br />
              <a href="https://vibefest.creator-spring.com/">
                BUY THE CHARITY MERCH
              </a>
            </p>
            <h4>LINEUP (times in PST):</h4>
            <p>
              <p>12:00 : Tropuwu </p>
              <p>12:35 : Paft Dunk</p>
              <p>1:10 : Emy (DEBUT) </p>
              <p>1:45 : Lake </p>
              <p>2:20 : Atham </p>
              <p>3:05 : Lost VCO </p>
              <p>3:40 : RADIANT </p>
              <p>4:15 : Self </p>
              <p>4:50 : Inverted </p>
              <p>5:25 : Velaspace </p>
              <p>6:00 : Broken screen </p>
              <p>6:50 : C0D3 (DJ SET) </p>
              <p>7:25 : Gurg </p>
              <p>8:00 : SAiX (DJ SET) </p>
              <p>8:35 : HOOBER (EX)</p>
              <p>9:10 : Kotori </p>
              <p>10:00 : Rennocence </p>
              <p>10:35 : Nider</p>
            </p>
          </div>
        </Spring>
      </div>
      <ThreeJSRender />
    </Container>
  );
}
