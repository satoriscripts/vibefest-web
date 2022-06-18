import { Avatar, Button, Container, Group } from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ArticleCardImage } from "~/components/BlogPreview";
import Comment from "~/components/Comment";
import { admins } from "~/global/constants";
import type { UserType } from "~/services/user.server";
import { getUserViaUsername } from "~/services/user.server";

export const loader: LoaderFunction = async ({ params }) => {
  const user = await getUserViaUsername(params.username?.toLowerCase() || "");
  if (!user) {
    return null;
  }
  return user;
};

export default function Userpage() {
  const user = useLoaderData<UserType>();

  if (user) {
    return (
      <Container>
        <Group>
          <Avatar src={user.profilePicture} radius="md" size="xl" />
          <h1 className="VIBEFEST_FONT">{user.displayName}</h1>
          {admins.includes(user.id) ? (
            <h3 className="VIBEFEST_FONT">(VIBEFEST STAFF)</h3>
          ) : (
            ""
          )}
        </Group>
        <hr />
        {user.posts.length >= 1 ? (
          <>
            <h2>Posts</h2>
            {user.posts.map((post) => (
              <ArticleCardImage key={post.id} {...post} />
            ))}
          </>
        ) : (
          ""
        )}
        {user.comments.length >= 1 ? (
          <>
            <h2>Comments</h2>
            {user.comments.map((comment) => (
              <>
                <Comment key={comment.id} {...comment} />
                <br />
              </>
            ))}
          </>
        ) : (
          ""
        )}
      </Container>
    );
  } else {
    return (
      <Container>
        <h1 className="VIBEFEST_FONT">User not found :/</h1>
        {/* back button */}
        <Button
          onClick={() => {
            window.history.back();
          }}
        >
          Back
        </Button>
      </Container>
    );
  }
}
