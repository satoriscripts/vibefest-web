import { Avatar, Button, Container, Group, Textarea } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import Comment from "~/components/Comment";
import PrettyDate from "~/components/DateFunction";
import { PostHeader } from "~/components/PostHeader";
import { admins } from "~/global/constants";
import { authenticator } from "~/services/auth.server";
import type { comments } from "~/services/comments.server";
import {
  createComment,
  getCommentsViaParentId,
} from "~/services/comments.server";
import type { Posts } from "~/services/post.server";
import { getPostViaSlug } from "~/services/post.server";

type loaderData = {
  post: Posts;
  session: any | null;
  comments: comments[];
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const post = await getPostViaSlug(params.slug || "");
  const comments = await getCommentsViaParentId(post?.id || "");

  let session = await authenticator.isAuthenticated(request);

  if (!session) {
    session = null;
  }

  return { post, session, comments } as loaderData;
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();

  const content = formData.get("comment") as string;
  if (content === "" || content === null) {
    return redirect("/news/" + params.slug);
  }

  const parentPost = await getPostViaSlug(params.slug || "");
  const parentPostId = parentPost?.id || "";
  const session = await authenticator.isAuthenticated(request);
  if (!session) {
    return redirect("/login");
  }
  const userId = session.json.id || "";

  const commentData = {
    parentPostId,
    userId,
    content,
  };

  await createComment(commentData);

  return null;
};

export const meta: MetaFunction = ({ data, params }) => {
  if (!data) {
    return {
      title: "Unknown Post - VIBEFEST",
      description: `There is no post with the slug of ${params.slug}.`,
    };
  }

  const { post } = data as loaderData;
  return {
    description: `${post.title} - ${PrettyDate(post.CreatedAt)}`,
    title: `${post.title} - VIBEFEST`,
    "twitter:title": `${post.title} - VIBEFEST`,
    "twitter:image": post.imageUrl,
    "twitter:description": `${post.title} - ${PrettyDate(post.CreatedAt)}`,
    "og:image": post.imageUrl,
    "og:title": `${post.title} - VIBEFEST`,
    "og:description": `${post.title} - ${PrettyDate(post.CreatedAt)}`,
    // "og:url": `https://mmatt.net/blog/${params.slug}`, replace when have a domain
  };
};

export default function BlogItem() {
  const { post, session, comments } = useLoaderData() as loaderData;

  const html = marked(post?.markdown.trim() ?? "");

  return (
    <Container>
      <PostHeader {...post} />

      {admins.includes(session?.json.id) ? (
        <h5>
          id: {post?.id} |{" "}
          <Link to={"/news/admin/edit/" + post.id} prefetch="intent">
            edit post
          </Link>
        </h5>
      ) : (
        ""
      )}

      <hr />

      <div dangerouslySetInnerHTML={{ __html: html }} />

      <hr />

      <h4>{comments.length} Comments</h4>

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
          <>
            <br key={comment.id} />
            <Comment key={comment.id} {...comment} />
          </>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </Container>
  );
}
