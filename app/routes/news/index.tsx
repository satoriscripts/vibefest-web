import { Container, Grid } from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { ArticleCardImageProps } from "~/components/BlogPreview";
import { ArticleCardImage } from "~/components/BlogPreview";
import { admins } from "~/global/constants";
import { authenticator } from "~/services/auth.server";
import { getPosts } from "~/services/post.server";

export let loader: LoaderFunction = async ({ request }) => {
  let session = await authenticator.isAuthenticated(request);

  if (!session) {
    session = null;
  }

  const allPosts = await getPosts();

  return { allPosts, session };
};

export default function NewsPage() {
  const { allPosts, session } = useLoaderData();

  const postsExist = allPosts.length > 0;

  return (
    <Container size="lg">
      {admins.includes(session?.json.id || "0") ? (
        <>
          <Link to="admin" prefetch="intent">
            admin page
          </Link>
        </>
      ) : (
        ""
      )}
      <h1 className="VIBEFEST_FONT">VIBEFEST NEWS</h1>
      <h2 className="VIBEFEST_FONT">Relevant news for VIBEFEST events.</h2>

      {postsExist ? (
        <Grid>
          {allPosts.map((post: ArticleCardImageProps) => (
            <Grid.Col key={post.id}>
              <ArticleCardImage key={post.slug} {...post} />
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <>
          <h2>no posts found!</h2>
        </>
      )}
    </Container>
  );
}
