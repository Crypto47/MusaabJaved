import { getRandom } from "@/utils/utils";
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

export async function Posts({
  range,
  columns = "1",
  thumbnail = false,
  exclude = [],
  direction,
  randomize,
  limit,
}: PostsProps) {
  let allBlogs = await getAllRSSPosts();

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
