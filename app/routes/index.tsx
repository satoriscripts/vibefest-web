import { Button, Container } from "@mantine/core";
import ThreeD from "~/components/3D";
import { ToggleTheme } from "~/components/ToggleTheme";

export default function IndexPage() {
  return (
    <Container>
      <ToggleTheme />
      <ThreeD />
    </Container>
  );
}
