import {
  Avatar,
  Button,
  createStyles,
  Group,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import type { User } from "@prisma/client";
import { Link } from "@remix-run/react";
import type { UserType } from "~/services/user.server";
import PrettyDate from "./DateFunction";

const useStyles = createStyles((theme) => ({
  card: {
    height: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },

  a: {
    textDecoration: "none",
  },
}));

export interface ArticleCardImageProps {
  id: string;
  category: string;
  imageUrl: string;
  markdown: string;
  slug: string;
  title: string;

  author?: UserType | User;

  CreatedAt: Date;
  UpdatedAt: Date;
}

export function ArticleCardImage({
  imageUrl,
  title,
  category,
  slug,
  CreatedAt,
  author,
}: ArticleCardImageProps) {
  const { classes } = useStyles();
  const aboveTitleText = `${category} | created: ${PrettyDate(CreatedAt)}`;

  return (
    <Link
      to={`/news/${slug}`}
      prefetch={"intent"}
      style={{ textDecoration: "none" }}
    >
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.81), rgba(0, 0, 0, 0.25)),url(${imageUrl})`,
        }}
        className={classes.card}
      >
        <div>
          <Group position="apart">
            <Text className={classes.category} size="xs">
              {aboveTitleText}
            </Text>
            {author ? (
              <Group>
                <Avatar src={author.profilePicture} size="sm" />
                <Text size="xs">Written by {author.displayName}</Text>
              </Group>
            ) : (
              ""
            )}
          </Group>
          <Title order={3} className={classes.title}>
            {title}
          </Title>
        </div>
        <Button variant="white" color="dark">
          Read post
        </Button>
      </Paper>
    </Link>
  );
}
export function ArticleCardImageAdminPage({
  imageUrl,
  title,
  category,
  slug,
  CreatedAt,
}: ArticleCardImageProps) {
  const { classes } = useStyles();
  const aboveTitleText = `${category} | created: ${PrettyDate(CreatedAt)}`;

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.81), rgba(0, 0, 0, 0.25)),url(${imageUrl})`,
      }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {aboveTitleText}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button variant="white" color="dark">
        Edit post
      </Button>
    </Paper>
  );
}
