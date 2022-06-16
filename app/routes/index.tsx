import { Center, Container } from "@mantine/core";
import ThreeJSRender from "~/components/3D";
import { ToggleTheme } from "~/components/ToggleTheme";

export default function IndexPage() {
  return (
    <Container>
      <ToggleTheme />
      <Center>
        <h1>VIBEFEST「VOL. 2」</h1>
      </Center>
      <ThreeJSRender />
    </Container>
  );
}
