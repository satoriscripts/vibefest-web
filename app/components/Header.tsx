import {
  Avatar,
  Burger,
  Button,
  Container,
  createStyles,
  Group,
  Header,
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { Link } from "@remix-run/react";
import type { HeaderSimpleProps } from "~/global/typings";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

export function HeaderSimple({ links, session }: HeaderSimpleProps) {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      prefetch="intent"
      className={cx(classes.link, {})}
    >
      {link.label}
    </Link>
  ));

  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <img
          src="/VibefestFlower.png"
          alt="The Vibefest logo is a very vibrant flower with neon blue, yellow, and pink colors."
          height="50"
          style={{
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        />
        <Group spacing={5} className={classes.links}>
          {items}
          {session ? (
            <>
              <Avatar src={session.json.profile_image_url} radius="md" />
            </>
          ) : (
            <Button component={Link} to="/login" prefetch="intent">
              Login
            </Button>
          )}
        </Group>

        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          className={classes.burger}
          size="sm"
        />
      </Container>
    </Header>
  );
}
