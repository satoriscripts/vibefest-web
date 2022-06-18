import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ArticleCardImageAdminPage } from "~/components/BlogPreview";
import type { posts } from "~/services/post.server";
import { getPosts } from "~/services/post.server";

type loaderData = {
  posts: posts[];
};

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();

  return { posts } as loaderData;
};

export default function UpdatePostPage() {
  const { posts } = useLoaderData() as loaderData;

  return (
    <>
      {posts.length >= 1 ? (
        posts.map((post) => {
          return (
            <Link
              to={"/news/admin/edit/" + post.id}
              prefetch="intent"
              style={{
                textDecoration: "none",
              }}
              key={post.id}
            >
              <br />
              <ArticleCardImageAdminPage key={post.slug} {...post} />
            </Link>
          );
        })
      ) : (
        <p>No posts found.</p>
      )}
    </>
  );
}
