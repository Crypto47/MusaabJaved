import { getPosts, getRandom } from "@/utils/utils";
import { getAllRSSPosts } from "@/utils/rss";
import { Grid } from "@once-ui-system/core";
import Post from "./Post";

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
  exclude?: string[];
  randomize?: boolean;
  limit?: number;
}

/**
 * The shape a blog card actually needs. Local MDX posts and syndicated RSS
 * posts carry different extra fields, but they agree on these.
 */
type BlogCardPost = {
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
    tag?: string;
    link?: string;
  };
  slug: string;
  content: string;
};

export async function Posts({
  range,
  columns = "1",
  thumbnail = false,
  exclude = [],
  direction,
  randomize,
  limit,
}: PostsProps) {
  // This listing used to render only the RSS feeds, which meant local .mdx
  // posts existed at /blog/<slug> and sat in the sitemap while nothing on the
  // site linked to them. Both sources are merged here so posts written in this
  // repo are actually reachable.
  const rssPosts = await getAllRSSPosts();
  const localPosts = getPosts(["src", "app", "blog", "posts"]);

  let allBlogs: BlogCardPost[] = [
    ...(localPosts as unknown as BlogCardPost[]),
    ...(rssPosts as unknown as BlogCardPost[]),
  ];

  if (exclude.length) {
    allBlogs = allBlogs.filter((post) => !exclude.includes(post.slug));
  }

  const sortedBlogs = allBlogs.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  const displayedBlogs = randomize
    ? getRandom(sortedBlogs, limit)
    : range
    ? sortedBlogs.slice(range[0] - 1, range.length === 2 ? range[1] : sortedBlogs.length)
    : limit
    ? sortedBlogs.slice(0, limit)
    : sortedBlogs;

  return (
    <>
      {displayedBlogs.length > 0 && (
        <Grid columns={columns} s={{ columns: 1 }} fillWidth marginBottom="40" gap="16">
          {displayedBlogs.map((post) => (
            <Post key={post.slug} post={post} thumbnail={thumbnail} direction={direction} />
          ))}
        </Grid>
      )}
    </>
  );
}
