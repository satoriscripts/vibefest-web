import { Avatar, createStyles, Group, Text } from "@mantine/core";
import type { User } from "@prisma/client";
import { Link } from "@remix-run/react";
import PrettyDate from "./DateFunction";

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
  },
}));

type CommentProps = {
  CreatedAt: Date;
  content: string;
  user?: User;
};

export default function Comment({ CreatedAt, content, user }: CommentProps) {
  const { classes } = useStyles();

  return (
    <div>
      <Group>
        <Avatar
          src={user?.profilePicture}
          alt={user?.displayName + "'s profile image."}
          radius="md"
        />
        <div>
          <Text size="sm">
            <Link to={`/${user?.username}`} prefetch="intent">
              {user?.displayName}
            </Link>
          </Text>
          <Text size="xs" color="dimmed">
            {PrettyDate(CreatedAt)}
          </Text>
        </div>
      </Group>
      <Text className={classes.body} size="sm">
        {content.trim()}
      </Text>
    </div>
  );
}
