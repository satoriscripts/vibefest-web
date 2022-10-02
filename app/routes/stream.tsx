import { Container } from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { HelixStream } from "@twurple/api";
import { ApiClient } from "@twurple/api";
import { ClientCredentialsAuthProvider } from "@twurple/auth";
import Iframe from "react-iframe-click";

// @ts-ignore creator didn't include types `@types/react-twitch-embed` >:( i also dont think that they maintain it anymore sooooooooo!!!!!!!!
import { TwitchEmbed } from "react-twitch-embed";

import PlayingArtist from "~/components/PlayingArtist";

export const loader: LoaderFunction = async () => {
  const clientId = process.env.TWITCH_CLIENT_ID ?? "";
  const accessToken = process.env.TWITCH_SECRET ?? "";

  const authProvider = new ClientCredentialsAuthProvider(clientId, accessToken);
  const apiClient = new ApiClient({ authProvider });

  // tpp = 56648155
  // vibefestlive = 788286383
  const stream = await apiClient.streams.getStreamByUserId("788286383");

  return {
    isLive: stream !== null,
    stream: stream,
    streamTitle: stream?.title,
  };
};

export default function StreamPage() {
  const { isLive, stream, streamTitle } = useLoaderData<{
    isLive: boolean;
    stream: HelixStream | null;
    streamTitle: string | null;
  }>();

  const artist = () => {
    try {
      if (!stream) return "";
      else {
        return streamTitle?.split("|")[1];
      }
    } catch (e) {
      return `${e}`;
    }
  };

  if (isLive) {
    return (
      <Container size="xl" mb="xl">
        <PlayingArtist artist={artist() ?? ""} />
        <TwitchEmbed
          channel="vibefestlive"
          id="vibefestlive"
          theme="dark"
          width="100%"
          onVideoPause={() => console.log(":(")}
        />

        <br />

        <h1> VIBEFEST DONATIONS </h1>
        <p>
          WE ARE RAISING MONEY, CHECK OUT THE{" "}
          <Link to="/donate" prefetch="intent">
            DONATION PAGE
          </Link>{" "}
          FOR MORE INFORMATION
        </p>

        <br />

        <h2>VIBEFEST CHARITY MERCH: RAISING MONEY FOR LAKE!</h2>
        <p>
          Browse around the merch shop! Click on the merch shop to open it in a
          new tab. Please don't try to checkout/shop on VIBEFEST.live, we aren't
          sure if the transaction would be completed. You might need to enable
          popups on VIBEFEST.live!
        </p>
        <Iframe
          // @ts-ignore typescript tweakin
          src="https://vibefest.creator-spring.com/"
          title="VIBEFEST Merch"
          width="100%"
          height="500px"
          onInferredClick={() => {
            window.open("https://vibefest.creator-spring.com/", "_blank");
          }}
        />

        <br />
      </Container>
    );
  } else {
    return (
      <Container style={{ textAlign: "center" }}>
        <h1 className="VIBEFEST_FONT">VIBEFEST「VOL. 3」 isn't live yet!</h1>
        <p>Come back later!</p>
        <p>
          <a href="https://twitch.tv/vibefestlive">Follow the Twitch</a> and{" "}
          <a href="https://discord.gg/9rJ5RKvn2J">Join the Discord!</a>
        </p>
      </Container>
    );
  }
}
