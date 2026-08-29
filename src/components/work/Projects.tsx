import { getRandom, getPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  randomize?: boolean;
  limit?: number;
  featuredOnly?: boolean;
}

export function Projects({ range, exclude, randomize, limit, featuredOnly }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  if (featuredOnly) {
    allProjects = allProjects.filter((post) => post.metadata.featured === true);
  }

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = randomize 
    ? getRandom(sortedProjects, limit) 
    : range
      ? sortedProjects.slice(range[0] - 1, range.length === 2 ? range[1] : sortedProjects.length)
      : sortedProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
          videoSrc={post.metadata.video || ""}
          problem={post.metadata.problem}
          solution={post.metadata.solution}
          techStack={post.metadata.techStack}
          features={post.metadata.features}
          impact={post.metadata.impact}
          architecture={post.metadata.architecture}
        />
      ))}
    </Column>
  );
}
