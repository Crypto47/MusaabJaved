"use client";

import {
  AvatarGroup,
  Button,
  Carousel,
  Column,
  Flex,
  Heading,
  Icon,
  Row,
  Text,
} from "@once-ui-system/core";
import { useState } from "react";

const DUMMY_VIDEO = "/videos/demo.mp4";

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
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  videoSrc,
}) => {
  const [activeMedia, setActiveMedia] = useState<"image" | "video">("video");
  const resolvedVideo = videoSrc || DUMMY_VIDEO;

  return (
    <Column fillWidth gap="m">
      <div style={{ position: "relative" }}>
        {activeMedia === "image" ? (
          images.length > 0 && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={images[0]}
              alt={title}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "var(--radius-l)",
              }}
            />
          )
        ) : (
          <video
            src={resolvedVideo}
            controls
            autoPlay
            muted
            playsInline
            style={{
              display: "block",
              width: "100%",
              aspectRatio: "16/10",
              objectFit: "cover",
              borderRadius: "var(--radius-l)",
              background: "#000",
            }}
          />
        )}

        <Row
          gap="4"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            zIndex: 10,
          }}
        >
          <button
            type="button"
            onClick={() => setActiveMedia("image")}
            aria-label="Show image"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              background:
                activeMedia === "image"
                  ? "rgba(255,255,255,0.28)"
                  : "rgba(0,0,0,0.50)",
              backdropFilter: "blur(8px)",
              color: "#fff",
              transition: "background 0.15s",
            }}
          >
            <Icon name="photo" size="xs" />
          </button>
          <button
            type="button"
            onClick={() => setActiveMedia("video")}
            aria-label="Show video"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              background:
                activeMedia === "video"
                  ? "rgba(255,255,255,0.28)"
                  : "rgba(0,0,0,0.50)",
              backdropFilter: "blur(8px)",
              color: "#fff",
              transition: "background 0.15s",
            }}
          >
            <Icon name="playCircle" size="xs" />
          </button>
        </Row>
      </div>

      <Flex
        s={{ direction: "column" }}
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {title && (
          <Flex flex={5}>
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
          </Flex>
        )}
        {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
          <Column flex={7} gap="16">
            {avatars?.length > 0 && (
              <AvatarGroup avatars={avatars} size="m" reverse />
            )}
            {description?.trim() && (
              <Text
                wrap="balance"
                variant="body-default-s"
                onBackground="neutral-medium"
              >
                {description}
              </Text>
            )}
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
        )}
      </Flex>
    </Column>
  );
};
