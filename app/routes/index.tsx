import { Container } from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import ThreeJSRender from "~/components/3D";

export const loader: LoaderFunction = () => {
  console.log("forsen");
  return null;
};

export default function IndexPage() {
  return (
    <Container>
      <div style={{ textAlign: "center" }}>
        <h1>VIBEFEST「VOL. 2」</h1>
        <h2>JULY 9TH - JULY 10TH</h2>
        <h3>
          <a href="https://vrchat.com/home/user/usr_622720da-7685-4595-b0b1-5574497b7d60">
            IN VRCHAT
          </a>{" "}
          AND <a href="https://twitch.tv/VIBEFESTLIVE">STREAMED ON TWITCH</a>
        </h3>
      </div>
      <ThreeJSRender />
    </Container>
  );
}
