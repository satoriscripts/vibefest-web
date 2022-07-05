import { Avatar, Button, Container, Group, Textarea } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import Comment from "~/components/Comment";
import { authenticator } from "~/services/auth.server";
import type { guestBookComments } from "~/services/guestbookcomments";
import {
  createGuestbookComment,
  getGuestBookComments,
} from "~/services/guestbookcomments";

type loaderData = {
  session: any | null;
  comments: guestBookComments[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const comments = await getGuestBookComments();

  let session = await authenticator.isAuthenticated(request);

  if (!session) {
    session = null;
  }

  return { session, comments } as loaderData;
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();

  const content = formData.get("comment") as string;
  if (content === "" || content === null) {
    return redirect("/guestbook");
  }

  const session = await authenticator.isAuthenticated(request);
  if (!session) {
    return redirect("/login");
  }
  const userId = session.json.id || "";

  const commentData = {
    userId,
    content,
  };

  await createGuestbookComment(commentData);
  return null;
};

export default function GuestbookPage() {
  const { session, comments } = useLoaderData() as loaderData;
  return (
    <Container>
      <h1>Guestbook</h1>
      {session ? (
        <Form method="post" reloadDocument>
          <p>
            <label>
              <Group spacing="sm">
                <Avatar
                  radius="md"
                  alt={session?.json.display_name + "'s profile image."}
                  src={session?.json.profile_image_url}
                />
                <Textarea
                  name="comment"
                  id="comment"
                  placeholder="Leave a comment..."
                  autosize
                  cols={90}
                />
              </Group>
            </label>
          </p>
          <p>
            <Button
              type="submit"
              size="xs"
              onClick={() => {
                showNotification({
                  title: "Commenting...",
                  message: "Your comment is being posted.",
                  loading: true,
                });
              }}
            >
              Comment
            </Button>
          </p>
        </Form>
      ) : (
        <>
          {" "}
          <Link to="/login" prefetch="intent">
            You must be logged in to comment.
          </Link>{" "}
          <br />{" "}
        </>
      )}

      {comments.length >= 1 ? (
        comments.map((comment) => (
          <div key={comment.id}>
            <br key={comment.id} />
            <Comment key={comment.id} {...comment} />
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </Container>
  );
}
