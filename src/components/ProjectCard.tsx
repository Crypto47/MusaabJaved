"use client";

import {
  Accordion,
  AvatarGroup,
  Button,
  Column,
  Flex,
  Grid,
  Heading,
  Icon,
  IconButton,
  Row,
  Tag,
  Text,
} from "@once-ui-system/core";
import { Fragment, useEffect, useRef, useState } from "react";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  videoSrc?: string;
  problem?: string;
  solution?: string;
  techStack?: string[];
  features?: string[];
  impact?: string[];
  architecture?: string[];
}

interface ChipGroupProps {
  label: string;
  items: string[];
  pipeline?: boolean;
}

const ChipGroup = ({ label, items, pipeline }: ChipGroupProps) => (
  <Column gap="8">
    <Text variant="label-default-s" onBackground="neutral-weak" className={styles.eyebrow}>
      {label}
    </Text>
    <Row wrap gap="8" vertical="center">
      {items.map((item, index) => (
        <Fragment key={item}>
          <Tag size="m">{item}</Tag>
          {pipeline && index < items.length - 1 && (
            <Icon name="arrowRight" size="xs" onBackground="neutral-weak" />
          )}
        </Fragment>
      ))}
    </Row>
  </Column>
);

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  videoSrc,
  problem,
  solution,
  techStack = [],
  features = [],
  impact = [],
  architecture = [],
}) => {
  // A project with no video of its own shows its cover image instead. The
  // previous fallback substituted an unrelated /videos/demo.mp4 and autoplayed
  // it, so any new project without a rendered video would silently present
  // someone else's footage as its own.
  const hasVideo = Boolean(videoSrc);
  const [activeMedia, setActiveMedia] = useState<"image" | "video">(
    hasVideo ? "video" : "image",
  );
  const [detailsOpen, setDetailsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (activeMedia === "video" && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [activeMedia]);

  const hasDetails = features.length > 0 || impact.length > 0 || architecture.length > 0;

  return (
    <Column fillWidth background="surface" border="neutral-alpha-weak" radius="l" overflow="hidden">
      <Row fillWidth s={{ direction: "column" }}>
        <Column flex={10} minWidth={0} vertical="center">
          <Column fillWidth position="relative">
            {activeMedia === "image" ? (
              images.length > 0 && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={images[0]}
                  alt={title}
                  style={{
                    display: "block",
                    width: "100%",
                    aspectRatio: "16/9",
                    objectFit: "cover",
                  }}
                />
              )
            ) : (
              <video
                ref={videoRef}
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                poster={images[0]}
                style={{
                  display: "block",
                  width: "100%",
                  aspectRatio: "16/9",
                  objectFit: "cover",
                }}
              />
            )}

            {/* No toggle when there is only one thing to show. */}
            {hasVideo && images.length > 0 && (
              <Row gap="4" className={styles.mediaToggle}>
                <IconButton
                  icon="photo"
                  size="s"
                  variant={activeMedia === "image" ? "primary" : "secondary"}
                  onClick={() => setActiveMedia("image")}
                  aria-label="Show image"
                />
                <IconButton
                  icon="playCircle"
                  size="s"
                  variant={activeMedia === "video" ? "primary" : "secondary"}
                  onClick={() => setActiveMedia("video")}
                  aria-label="Show video"
                />
              </Row>
            )}
          </Column>
        </Column>

        <Column flex={12} minWidth={0} padding="24" gap="16">
          {title && (
            <Heading as="h2" wrap="balance" variant="heading-strong-l">
              {title}
            </Heading>
          )}
          {description?.trim() && (
            <Text wrap="balance" variant="body-default-s" onBackground="neutral-medium">
              {description}
            </Text>
          )}

          {(problem || solution) && (
            <Grid columns="2" s={{ columns: "1" }} fillWidth gap="12">
              {problem && (
                <Column
                  background="page"
                  border="neutral-alpha-weak"
                  radius="m"
                  padding="16"
                  gap="8"
                >
                  <Row gap="8" vertical="center">
                    <Icon name="alert" size="xs" onBackground="danger-weak" />
                    <Text
                      variant="label-default-s"
                      onBackground="neutral-weak"
                      className={styles.eyebrow}
                    >
                      Problem
                    </Text>
                  </Row>
                  <Text variant="body-default-xs" onBackground="neutral-medium">
                    {problem}
                  </Text>
                </Column>
              )}
              {solution && (
                <Column
                  background="page"
                  border="neutral-alpha-weak"
                  radius="m"
                  padding="16"
                  gap="8"
                >
                  <Row gap="8" vertical="center">
                    <Icon name="checkCircle" size="xs" onBackground="success-weak" />
                    <Text
                      variant="label-default-s"
                      onBackground="neutral-weak"
                      className={styles.eyebrow}
                    >
                      Solution
                    </Text>
                  </Row>
                  <Text variant="body-default-xs" onBackground="neutral-medium">
                    {solution}
                  </Text>
                </Column>
              )}
            </Grid>
          )}

          {techStack.length > 0 && (
            <Row wrap gap="8">
              {techStack.map((tech) => (
                <Tag key={tech} size="m">
                  {tech}
                </Tag>
              ))}
            </Row>
          )}

          {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="s" reverse />}

          <Flex gap="8" wrap>
            {content?.trim() && (
              <Button
                suffixIcon="arrowRight"
                size="s"
                variant="primary"
                style={{ margin: "0", width: "fit-content" }}
                href={href}
              >
                <Text variant="label-default-s">Tell me more</Text>
              </Button>
            )}
            {link && (
              <Button
                suffixIcon="arrowUpRightFromSquare"
                size="s"
                variant="secondary"
                style={{ margin: "0", width: "fit-content" }}
                href={link}
              >
                <Text variant="label-default-s">View project</Text>
              </Button>
            )}
          </Flex>
        </Column>
      </Row>

      {hasDetails && (
        <Column fillWidth className={styles.detailsWrap}>
          <Accordion
            title={<Text variant="label-strong-s">View Workflow Details</Text>}
            icon="chevronDown"
            open={detailsOpen}
            onToggle={() => setDetailsOpen((open) => !open)}
          >
            <Column gap="20" paddingBottom="8">
              {features.length > 0 && <ChipGroup label="Workflow Features" items={features} />}
              {impact.length > 0 && <ChipGroup label="Business Impact" items={impact} />}
              {architecture.length > 0 && (
                <ChipGroup label="Workflow Architecture" items={architecture} pipeline />
              )}
            </Column>
          </Accordion>
        </Column>
      )}
    </Column>
  );
};
