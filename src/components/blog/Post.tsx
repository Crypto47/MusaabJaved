"use client";

import { Card, Heading, Column, Media, Row, Avatar, Text, Flex } from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";
import { person } from "@/resources";

interface PostProps {
  post: any;
  thumbnail: boolean;
  direction?: "row" | "column";
}

export default function Post({ post, thumbnail, direction = "column" }: PostProps) {
  return (
    <Card
      fillWidth
      key={post.slug}
      href={post.metadata.link || `/blog/${post.slug}`}
      transition="micro-medium"
      direction={direction}
      border="transparent"
      background="transparent"
      radius="l"
      gap="24"
      paddingX="20"
    >
      {post.metadata.image && thumbnail && (
        <Flex fillWidth style={{ flex: direction === "row" ? '1' : 'none' }}>
          <Media
            priority
            sizes="(max-width: 768px) 100vw, 640px"
            border="neutral-alpha-weak"
            cursor="interactive"
            radius="m"
            src={post.metadata.image}
            alt={"Thumbnail of " + post.metadata.title}
            aspectRatio="16 / 9"
          />
        </Flex>
      )}
      <Column 
        fillWidth 
        paddingY="12" 
        gap="16" 
        style={{ flex: direction === "row" ? '1.5' : 'none' }}
      >
        <Column gap="12">
          <Row>
            <Heading as="h2" variant="heading-strong-xl" wrap="balance">
              {post.metadata.title}
            </Heading>
            {post.metadata.tag && (
              <Text style={{ marginLeft: "auto" }} variant="label-strong-xs" onBackground="neutral-weak">
                {post.metadata.tag}
              </Text>
            )}
          </Row>
          {post.metadata.summary && (
            <Text variant="body-default-s" wrap="balance" onBackground="neutral-medium">
              {post.metadata.summary}
            </Text>
          )}
        </Column>
      </Column>
    </Card>
  );
}
