import type React from "react";
import { Text, Avatar, Skeleton, Row, Column } from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";
import type { Comment } from "@/app/api/comments/route";

interface CommentListProps {
  comments: Comment[];
  isLoading?: boolean;
  variant?: "default" | "compact";
}

const CommentSkeleton: React.FC<{ variant?: "default" | "compact" }> = ({ variant = "default" }) => {
  const isCompact = variant === "compact";
  return (
    <Row gap={isCompact ? "8" : "12"} paddingY={isCompact ? "8" : "16"} fillWidth vertical="start">
      <Skeleton shape="circle" width={isCompact ? "s" : "m"} height={isCompact ? "s" : "m"} />
      <Column gap="8" fillWidth>
        <Skeleton shape="block" width="m" height="xs" />
        <Skeleton shape="block" width="xl" height="xs" />
      </Column>
    </Row>
  );
};

export const CommentList: React.FC<CommentListProps> = ({
  comments = [],
  isLoading,
  variant = "default",
}) => {
  const isCompact = variant === "compact";
  return (
    <Column fillWidth gap={isCompact ? "0" : "4"}>
      {comments.map((comment) => (
        <Row
          key={comment.id}
          gap={isCompact ? "12" : "16"}
          paddingY={isCompact ? "8" : "12"}
          fillWidth
          vertical="start"
        >
          <Avatar
            statusIndicator={comment.author?.is_admin ? { color: "green" } : undefined}
            src={comment.author?.image || undefined}
            size={isCompact ? "m" : "l"}
            style={{ flexShrink: 0, marginTop: isCompact ? "0" : "2px" }}
          />
          <Column fillWidth gap="4">
            <Row vertical="center" fillWidth style={{ flexWrap: "wrap" }}>
              <Text variant={`body-default-${isCompact ? "s" : "m"}`} onBackground="neutral-strong" paddingRight="8">
                {comment.author?.name || comment.author?.email?.split("@")[0] || "Anonymous"}
              </Text>
              <Text variant={"label-default-xs"} onBackground="neutral-weak">
                {formatDate(comment.created_at, true)}
              </Text>
            </Row>
            <Text
              variant={`body-default-${isCompact ? "s" : "m"}`}
              style={{ whiteSpace: "pre-wrap", lineHeight: isCompact ? "1.4" : "1.6" }}
              onBackground="neutral-medium"
            >
              {comment.content}
            </Text>
          </Column>
        </Row>
      ))}
      {isLoading && <CommentSkeleton variant={variant} />}
    </Column>
  );
};
