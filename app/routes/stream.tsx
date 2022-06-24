import { Button, Collapse, Container } from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { HelixStream } from "@twurple/api";
import { ApiClient } from "@twurple/api";
import { ClientCredentialsAuthProvider } from "@twurple/auth";
import { useState } from "react";
import Iframe from "react-iframe-click";

// @ts-ignore creator didn't include types `@types/react-twitch-embed` >:( i also dont think that they maintain it anymore sooooooooo!!!!!!!!
import { TwitchEmbed } from "react-twitch-embed";

import PlayingArtist from "~/components/PlayingArtist";

export const loader: LoaderFunction = async () => {
  const clientId = process.env.TWITCH_CLIENT_ID ?? "";
  const accessToken = process.env.TWITCH_SECRET ?? "";

  const authProvider = new ClientCredentialsAuthProvider(clientId, accessToken);
  const apiClient = new ApiClient({ authProvider });

  const tiltifyHeaders = {
    Authorization: `Bearer ${process.env.TILTIFY_TOKEN}`,
  };

  // tpp = 56648155
  // vibefestlive = 788286383

  let [stream, recentDonations, tiltifyCampaign] = await Promise.all([
    apiClient.streams.getStreamByUserId("788286383"),
    fetch("https://tiltify.com/api/v3/campaigns/171212/donations", {
      headers: tiltifyHeaders,
    }),
    fetch("https://tiltify.com/api/v3/campaigns/171212", {
      headers: tiltifyHeaders,
    }),
  ]);

  let [recentDonationsData, tiltifyCampaignData] = await Promise.all([
    recentDonations.json(),
    tiltifyCampaign.json(),
  ]);

  console.log(tiltifyCampaignData);

  return {
    isLive: stream !== null,
    stream,
    recentDonations: recentDonationsData,
    tiltifyCampaign: tiltifyCampaignData,
  };
};

export type Donation = {
  id: number;
  amount: number;
  name: string;
  comment: string;
  completedAt: number;
  rewardId: number;
};

export default function StreamPage() {
  const { isLive, stream, recentDonations, tiltifyCampaign } = useLoaderData<{
    isLive: boolean;
    stream: HelixStream | null;
    recentDonations: {
      meta: {
        status: number;
      };
      data: Donation[];
      links: {
        prev: string;
        next: string;
        self: string;
      };
    };

    tiltifyCampaign: {
      meta: {
        status: number;
      };
      data: {
        id: number;
        name: string;
        slug: string;
        url: string;
        startsAt: number;
        endsAt: number;
        description: string;
        avatar: {
          src: string;
          alt: string;
          width: number;
          height: number;
        };
        causeId: number;
        fundraisingEventId: number;
        fundraiserGoalAmount: number;
        originalGoalAmount: number;
        amountRaised: number;
        supportingAmountRaised: number;
        totalAmountRaised: number;
        supportable: boolean;
        status: string;
        user: {
          id: number;
          username: string;
          slug: string;
          url: string;
          avatar: {
            src: string;
            alt: string;
            width: number;
            height: number;
          };
        };
        team: {
          id: number;
          username: string;
          slug: string;
          url: string;
          avatar: {
            src: string;
            alt: string;
            width: number;
            height: number;
          };
        };
        livestream: {
          type: string;
          channel: string;
        };
      };
    };
  }>();
  const [opened, setOpen] = useState(false);

  const artist = () => {
    try {
      if (!stream) return "";
      else {
        return stream.title.split("|")[1];
      }
    } catch (e) {
      return "";
    }
  };

  if (isLive) {
    return (
      <Container size="xl" mb="xl">
        <PlayingArtist artist={artist()} />
        <TwitchEmbed
          channel="vibefestlive"
          id="vibefestlive"
          theme="dark"
          width="100%"
          onVideoPause={() => console.log(":(")}
        />

        <br />

        <h2>VIBEFEST CHARITY DONATIONS: THE TREVOR PROJECT</h2>
        <p>
          We are raising money for The Trevor Project! Check out the recent
          donations below and consider making your own donation! We have raised{" "}
          ${tiltifyCampaign.data.totalAmountRaised} out of $
          {tiltifyCampaign.data.fundraiserGoalAmount}!!!
        </p>

        <h3>
          {" "}
          <a href="https://donate.tiltify.com/+vibefestvol-2/vibefest2">
            DONATE HERE!!!
          </a>
        </h3>

        <Button onClick={() => setOpen((o) => !o)}>
          {opened ? "Hide" : "See"} Recent Donations
        </Button>

        <Collapse in={opened}>
          {recentDonations.data.length >= 1 ? (
            recentDonations.data.map((donation: Donation) => (
              <div key={donation.id}>
                <p>{donation.name}</p>
                <p>{donation.comment}</p>
                <p>{donation.amount}</p>
              </div>
            ))
          ) : (
            <p>
              No donations yet! (or it just didn't work, I'm not sure! ping
              @mmattbtw in chat if you donated and it showed up on stream and
              not in here) Either way,{" "}
              <a href="https://donate.tiltify.com/+vibefestvol-2/vibefest2">
                donate NOW!
              </a>
            </p>
          )}
        </Collapse>

        <h2>
          VIBEFEST CHARITY MERCH: THE ROBINSON MALAWI FUND + THE COLON CANCER
          FOUNDATION.
        </h2>
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
        <h1 className="VIBEFEST_FONT">VIBEFEST「VOL. 2」 isn't live yet!</h1>
        <p>Come back later!</p>
        <p>
          <a href="https://twitch.tv/vibefestlive">Follow the Twitch</a> and{" "}
          <a href="https://vrchat.com/home/user/usr_622720da-7685-4595-b0b1-5574497b7d60">
            add "VIBEFEST" in game!
          </a>
        </p>
      </Container>
    );
  }
}
