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
            <h1>VIBEFEST「VOL. 4」</h1>
            <h3>
              <a href="https://vrc.group/VIBE.9162">
                IN VRCHAT
              </a>{" "}
              AND{" "}
              <a href="https://twitch.tv/VIBEFESTLIVE">STREAMED ON TWITCH</a>
            </h3>
            <p>
              <a href="https://discord.gg/9rJ5RKvn2J">JOIN OUR DISCORD</a>
              <br />
              <a href="https://vrc.group/VIBE.9162">JOIN OUR VRCHAT GROUP: VIBE.9162</a>
              <br />
              <a href="https://vibefest.creator-spring.com/">
                BUY THE CHARITY MERCH
              </a>
              <br />
              <a href="https://shop.vibefest.live/">
                BUY THE CHARITY MERCH (Radio Vibefest.)
              </a>
            </p>

            <h4>Radio Vibefest.</h4>
            <iframe
              src="https://radio.vibefest.live/public/radio_vibefest/embed?theme=dark"
              title="Radio Vibefest. embed"
              frameBorder="0"
              allowTransparency={true}
              style={{ width: "90%", minHeight: "150px", border: "0" }}
            ></iframe>
          </div>
        </Spring>
      </div>
      <ThreeJSRender />
    </Container>
  );
}
