import { Button, Column, Heading, Text, Meta } from "@once-ui-system/core";
import { getPosts } from "@/utils/utils";
import { baseURL, routes } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: "Sitemap",
    description: "All pages, projects, and blog posts on this site.",
    baseURL,
    path: "/site-map",
  });
}

const mainPages = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
];

export default function SitemapPage() {
  const projects = getPosts(["src", "app", "work", "projects"]).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );

  const posts = getPosts(["src", "app", "blog", "posts"]).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );

  return (
    <Column maxWidth="m" paddingY="12" gap="64" paddingX="l">
      <Column gap="8">
        <Heading variant="display-strong-l">Sitemap</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          All pages, projects, and blog posts on this site.
        </Text>
      </Column>

      {/* Pages */}
      <Column gap="16">
        <Heading as="h2" variant="heading-strong-m">
          Pages
        </Heading>
        <Column gap="4">
          {mainPages
            .filter((p) => routes[p.href as keyof typeof routes] !== false)
            .map((p) => (
              <Button
                key={p.href}
                href={p.href}
                variant="tertiary"
                suffixIcon="arrowRight"
                style={{ justifyContent: "flex-start" }}
              >
                {p.label}
              </Button>
            ))}
        </Column>
      </Column>

      {/* Projects */}
      {projects.length > 0 && (
        <Column gap="16">
          <Heading as="h2" variant="heading-strong-m">
            Projects
          </Heading>
          <Column gap="4">
            {projects.map((p) => (
              <Button
                key={p.slug}
                href={`/work/${p.slug}`}
                variant="tertiary"
                suffixIcon="arrowRight"
                style={{ justifyContent: "flex-start" }}
              >
                {p.metadata.title}
              </Button>
            ))}
          </Column>
        </Column>
      )}

      {/* Blog posts */}
      {posts.length > 0 && (
        <Column gap="16">
          <Heading as="h2" variant="heading-strong-m">
            Blog Posts
          </Heading>
          <Column gap="4">
            {posts.map((p) => (
              <Button
                key={p.slug}
                href={`/blog/${p.slug}`}
                variant="tertiary"
                suffixIcon="arrowRight"
                style={{ justifyContent: "flex-start" }}
              >
                {p.metadata.title}
              </Button>
            ))}
          </Column>
        </Column>
      )}
    </Column>
  );
}
