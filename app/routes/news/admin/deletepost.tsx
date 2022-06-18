import { Button, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { posts } from "~/services/post.server";
import { deletePost, getPosts } from "~/services/post.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const id = formData.get("id") as string;
  await deletePost(id);

  return redirect("/news");
};

type loaderType = {
  posts: posts[];
};

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();

  return { posts } as loaderType;
};

export default function DeletePostPage() {
  const { posts } = useLoaderData() as loaderType;

  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <div
            onClick={() => {
              navigator.clipboard.writeText(post.id);
              showNotification({
                title: "Copied!",
                message: "Copied post ID: `" + post.id + "` to your clipboard.",
              });
            }}
            style={{
              textDecoration: "none",
            }}
          >
            (id: {post.id}) {post.title}
          </div>
        </div>
      ))}
      <Form method="post">
        <p>
          <label>
            Post ID: <TextInput type="text" name="id" />
          </label>
        </p>
        <p className="text-right">
          <Button type="submit">Delete Post</Button>
        </p>
      </Form>
    </>
  );
}
