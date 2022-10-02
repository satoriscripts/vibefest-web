import { Container } from "@mantine/core";
import ThreeJSRender from "~/components/3D";
import { Spring } from "~/components/Spring";

type loaderFunctionData = {
  isLive: boolean;
  artist: string;
};

// export const loader: LoaderFunction = async () => {
//   const clientId = process.env.TWITCH_CLIENT_ID ?? "";
//   const accessToken = process.env.TWITCH_SECRET ?? "";

//   const authProvider = new ClientCredentialsAuthProvider(clientId, accessToken);
//   const apiClient = new ApiClient({ authProvider });

//   //  788286383 = vibefestlive
//   //  56648155 = TwitchPlaysPokemon (always live, mean for dev)
//   const stream = await apiClient.streams.getStreamByUserId("788286383");
//   const isLive = stream !== null;
//   const artist = stream?.title.split("|")[1] ?? "";

//   return json<loaderFunctionData>({
//     isLive,
//     artist,
//   });
// };

export default function IndexPage() {
  // const { isLive, artist } = useLoaderData<loaderFunctionData>();

  return (
    <Container>
      <div style={{ textAlign: "center" }}>
        {/* {isLive ? <LiveNow artist={artist} /> : ""} */}

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
            <h4>LINEUP:</h4>
            <p>
              <p>Kotori</p>
              <p>emy (DEBUT)</p>
              <p>tropuwu</p>
              <p>Paft Dunk</p>
              <p>HOOBER (EX)</p>
              <p>atham</p>
              <p>nider</p>
              <p>self</p>
              <p>lost vco</p>
              <p>inverted</p>
              <p>saix (DJ SET)</p>
              <p>broken screen</p>
              <p>velaspace</p>
              <p>c0d3</p>
              <p>Lake</p>
              <p>gurg</p>
            </p>
          </div>
        </Spring>
      </div>
      <ThreeJSRender />
    </Container>
  );
}
